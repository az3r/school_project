import {
  AuthenticationResponseJSON,
  generateAuthenticationOptions,
  generateRegistrationOptions,
  RegistrationResponseJSON,
  VerifiedAuthenticationResponse,
  VerifiedRegistrationResponse,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import AccountEntity from "../domains/entities/account.entity";
import entity_manager from "../modules/typeorm";
import logger from "../tools/logger";
import PasskeyEntity from "../domains/entities/passkey.entity";
import { error } from "console";
import { isoUint8Array } from "@simplewebauthn/server/helpers";
import app from "../modules/app";
import { EntitySchemaOptions } from "typeorm";
import AuthenticationEntity from "../domains/entities/authentication.entity";

const rp_name = "Az3r";
const rp_id = "service-core.vercel.app";
const origin = [
  "android:apk-key-hash:AEGBzXlcOO75kBxiThcS5pOb_09pOAZrhC1zzmUQT00",
  "android:apk-key-hash:KJdd4KQHsjVigPbIWtHYWT6ZQxbbeBU12Wx7H77vGE8",
];

app.get("/verify-account-registration", async (req, res) => {
  const query = req.query as { id: string };

  const account = await entity_manager.findOneBy(AccountEntity, {
    id: query.id,
  });
  if (!account) return res.status(404).json();

  return res.json({
    id: account.id,
    is_activated: account.is_activated,
  });
});

app.post("/generate-authentication-options", async (req, res) => {
  const body = req.body as { id: string };

  const user = await entity_manager.findOne(AccountEntity, {
    where: { id: body.id },
    select: { id: true, is_activated: true },
  });

  if (!user) {
    return res
      .status(404)
      .json({ error: { message: "Account does not exist in system" } });
  }

  if (!user.is_activated) {
    return res
      .status(400)
      .json({ error: { message: "Account is not activated" } });
  }

  const passkeys = await entity_manager.findOneBy(PasskeyEntity, {
    account_id: body.id,
  });

  const options = await generateAuthenticationOptions({
    rpID: passkeys.rp_id,
    allowCredentials: [passkeys.registration_info.credential],
  });

  await entity_manager.upsert(
    AuthenticationEntity,
    {
      account_id: user.id,
      challenge: options.challenge,
      rp_id,
      rp_name,
      origin,
      options,
    },
    ["account_id"]
  );
  return res.json(options);
});

app.post("/verify-authentication-response", async (req, res) => {
  const body = req.body as { id: string; response: AuthenticationResponseJSON };
  logger.info(body);

  const user = await entity_manager.findOne(AccountEntity, {
    where: { id: body.id },
    select: { id: true, is_activated: true },
  });

  if (!user) {
    return res
      .status(404)
      .json({ error: { message: "Account does not exist in system" } });
  }

  if (!user.is_activated) {
    return res
      .status(400)
      .json({ error: { message: "Account is not activated" } });
  }

  const authentication = await entity_manager.findOneBy(AuthenticationEntity, {
    account_id: user.id,
  });

  const passkeys = await entity_manager.findOneBy(PasskeyEntity, {
    account_id: body.id,
  });

  if (!authentication) {
    return res.status(400).json({ error: { message: "" } });
  }
  const credential = passkeys.registration_info.credential;
  credential.publicKey = Uint8Array.from(Object.values(credential.publicKey));
  try {
    const verification = await verifyAuthenticationResponse({
      response: body.response,
      expectedChallenge: authentication.challenge,
      expectedOrigin: authentication.origin,
      expectedRPID: authentication.rp_id,
      credential,
    });
    if (verification.verified) return res.json(verification.authenticationInfo);
    return res.status(400).json({
      error: { message: "Failed to verify authentication response" },
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }
});

app.post("/generate-registration-options", async (req, res) => {
  const payload = req.body as AccountEntity;

  const user = await entity_manager.findOne(AccountEntity, {
    where: { id: payload.id },
  });

  if (!user) {
    return res
      .status(404)
      .json({ error: { message: "Account does not exist in system" } });
  }

  if (user.is_activated) {
    return res
      .status(400)
      .json({ error: { message: "Account was activated" } });
  }

  const options = await generateRegistrationOptions({
    rpName: rp_name,
    rpID: rp_id,
    userID: isoUint8Array.fromUTF8String(user.id),
    userName: user.name,
    authenticatorSelection: {
      authenticatorAttachment: "platform",
    },
  });

  await entity_manager.upsert(
    PasskeyEntity,
    {
      account_id: user.id,
      challenge: options.challenge,
      options: options,
      rp_id,
      rp_name,
      origin,
    },
    ["account_id"]
  );

  res.json(options);
});

app.post("/verify-registration-response", async (req, res) => {
  const body = req.body as {
    id: string;
    response: RegistrationResponseJSON;
  };

  const account_passkeys = await entity_manager.findOne(PasskeyEntity, {
    where: { account_id: body.id },
  });

  if (!account_passkeys) {
    return res.status(400).json({
      error: {
        message: "Account is not activated",
      },
    });
  }

  let verification: VerifiedRegistrationResponse;
  try {
    verification = await verifyRegistrationResponse({
      response: body.response,
      expectedChallenge: account_passkeys.challenge,
      expectedOrigin: account_passkeys.origin,
      expectedRPID: account_passkeys.rp_id,
    });
  } catch (error) {
    logger.error(error);
    res.status(400).json({ error });
  }

  if (!verification.verified) {
    res.status(400).json({
      error: {
        message: "Failed to verify registration response",
      },
    });
    return;
  }

  account_passkeys.registration_info = verification.registrationInfo;
  account_passkeys.response = body.response;
  await entity_manager.save(account_passkeys);
  await entity_manager.update(
    AccountEntity,
    { id: body.id },
    { is_activated: true }
  );

  return res.status(200).json();
});
