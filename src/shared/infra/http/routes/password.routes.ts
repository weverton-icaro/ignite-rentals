import { Router } from "express";

import { ResetPasswordUserController } from "@modules/Accounts/UseCases/ResetPasswordUser/ResetPasswordUserController";
import { SendForgotPasswordMailController } from "@modules/Accounts/UseCases/SendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
