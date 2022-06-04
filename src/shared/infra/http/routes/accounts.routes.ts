import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/Accounts/UseCases/CreateUser/CreateUserController";
import { ProfileUserController } from "@modules/Accounts/UseCases/ProfileUser/ProfileUserController";
import { UpdateUserAvatarController } from "@modules/Accounts/UseCases/Upload/UserAvatar/UpdateUserAvatarController";
import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";

const accountsRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();

const updateUserAvatarController = new UpdateUserAvatarController();

const profileUserController = new ProfileUserController();

accountsRoutes.post("/", createUserController.handle);

accountsRoutes.patch(
  "/avatar",
  ensureAuth,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

accountsRoutes.get("/profile", ensureAuth, profileUserController.handle);

export { accountsRoutes };
