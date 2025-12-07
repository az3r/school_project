import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import router from "../modules/router";
import { AccountEntity } from "../domains/entities/account.entity";
import entity_manager from "../modules/typeorm";
import logger from "../tools/logger";

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
});

// router.post("/verify-registration", async (req, res) => {
//   const verification = await verifyRegistrationResponse({
//     response: req.body,
//     expectedChallenge: savedChallenge,
//     expectedOrigin: "https://myapp.com",
//     expectedRPID: "myapp.com",
//   });
//   if (verification.verified) {
//     // Save credential to DB
//   }
//   res.json({ verified: verification.verified });
// });
