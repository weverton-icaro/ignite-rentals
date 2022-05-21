import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/Accounts/useCases/CreateUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/Accounts/useCases/Update/UserAvatar/UpdateUserAvatarController";
import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";

const accountsRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();

const updateUserAvatarController = new UpdateUserAvatarController();

accountsRoutes.post("/", createUserController.handle);

accountsRoutes.patch(
  "/avatar",
  ensureAuth,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export { accountsRoutes };
