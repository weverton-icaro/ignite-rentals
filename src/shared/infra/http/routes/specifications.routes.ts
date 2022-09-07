import { Router } from "express";

import { CreateSpecificationController } from "@modules/Cars/UseCases/CreateSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "@modules/Cars/UseCases/LIstSpecifications/ListSpecificationsController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

const listSpecificationsController = new ListSpecificationsController();

specificationsRoutes.use(ensureAuth);
specificationsRoutes.post(
  "/",
  ensureAdmin,
  createSpecificationController.handle
);

specificationsRoutes.get("/", listSpecificationsController.handle);

export { specificationsRoutes };
