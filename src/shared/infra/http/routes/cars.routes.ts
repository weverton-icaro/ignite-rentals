import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/Cars/UseCases/CreateCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/Cars/UseCases/CreateCarSpecification/CreateCarSpecificationController";
import { ListAllCarsController } from "@modules/Cars/UseCases/ListAllCars/ListAllCarsController";
import { ListAvailableCarsController } from "@modules/Cars/UseCases/ListAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "@modules/Cars/UseCases/UploadCarImage/UploadCarImageController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuth } from "../middlewares/ensureAuth";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAllCars = new ListAllCarsController();
const listAvailableCars = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

const upload = multer(uploadConfig.upload("./tmp/car"));

carsRoutes.use(ensureAuth);

carsRoutes.post("/", ensureAdmin, createCarController.handle);

carsRoutes.get("/", listAllCars.handle);

carsRoutes.get("/available", listAvailableCars.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAdmin,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/images/:id",
  ensureAdmin,
  upload.array("images"),
  uploadCarImageController.handle
);

export { carsRoutes };
