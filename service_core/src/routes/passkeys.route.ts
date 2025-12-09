import {
  generateRegistrationOptions,
  RegistrationResponseJSON,
  VerifiedAuthenticationResponse,
  VerifiedRegistrationResponse,
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

app.post("/generate-registration-options", async (req, res) => {
  const payload = req.body as AccountEntity;

  const user = await entity_manager.findOne(AccountEntity, {
    where: { id: payload.id },
  });

  if (!user) {
    return res
      .status(401)
      .json({ error: { message: "Account does not exist in system" } });
  }

  if (user.is_activated) {
    return res
      .status(400)
      .json({ error: { message: "Account was activated" } });
  }

  const options = await generateRegistrationOptions({
    rpName: "Az3r",
    rpID: "service-core.vercel.app",
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
      expectedOrigin:
        "android:apk-key-hash:AEGBzXlcOO75kBxiThcS5pOb_09pOAZrhC1zzmUQT00",
      expectedRPID: "service-core.vercel.app",
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
