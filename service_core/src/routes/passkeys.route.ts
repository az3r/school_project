import {
  generateRegistrationOptions,
  RegistrationResponseJSON,
  VerifiedAuthenticationResponse,
  VerifiedRegistrationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import router from "../modules/router";
import AccountEntity from "../domains/entities/account.entity";
import entity_manager from "../modules/typeorm";
import logger from "../tools/logger";
import PasskeyEntity from "../domains/entities/passkey.entity";
import { error } from "console";

router.post("/generate-registration-options", async (ctx) => {
  const payload = ctx.request.body as AccountEntity;
  const user = await entity_manager.findOne(AccountEntity, {
    where: { id: payload.id },
  });
  const options = await generateRegistrationOptions({
    rpName: "Az3r",
    rpID: "com.me.az3r",
    userID: Uint8Array.from(user.id),
    userName: user.name,
    authenticatorSelection: {
      requireResidentKey: true,
      residentKey: "required",
      userVerification: "required",
    },
  });
  ctx.body = options;

  await entity_manager.upsert(
    PasskeyEntity,
    {
      account_id: user.id,
      challenge: options.challenge,
      options: options,
    },
    ["account_id"]
  );
});

router.post("/verify-registration-response", async (ctx) => {
  const body = ctx.request.body as {
    id: string;
    response: RegistrationResponseJSON;
  };

  const account = await entity_manager.findOne(PasskeyEntity, {
    where: { account_id: body.id },
  });

  if (!account) {
    ctx.status = 400;
    ctx.body = {
      error: {
        message: "Account is not activated",
      },
    };
    return;
  }

  let verification: VerifiedRegistrationResponse;
  try {
    verification = await verifyRegistrationResponse({
      response: body.response,
      expectedChallenge: account.challenge,
      expectedOrigin: origin,
      expectedRPID: "com.me.az3r",
    });
  } catch (error) {
    logger.error(error);
    ctx.status = 400;
    ctx.body = { error };
  }

  if (!verification.verified) {
    ctx.status = 400;
    ctx.body = {
      error: {
        message: "Failed to verify registration response",
      },
    };
    return;
  }

  account.registration_info = verification.registrationInfo;
  await entity_manager.save(account);

  ctx.status = 200;
});
