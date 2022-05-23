import { Router } from "express";

import { AuthUserController } from "@modules/Accounts/UseCases/Auth/AuthUserController";
import { RefreshTokenController } from "@modules/Accounts/UseCases/RefreshToken/RefreshTokenController";

const authRoute = Router();

const authUserController = new AuthUserController();

const refreshTokenController = new RefreshTokenController();

authRoute.post("/sessions", authUserController.handle);

authRoute.post("/refresh-token", refreshTokenController.handle);

export { authRoute };
