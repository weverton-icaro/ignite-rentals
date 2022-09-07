import { Router } from "express";

import { CreateRentalController } from "@modules/Rentals/UseCases/CreateRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/Rentals/UseCases/DevolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/Rentals/UseCases/LIstRentalsByUser/ListRentalsByUserController";

import { ensureAuth } from "../middlewares/ensureAuth";

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuth, createRentalController.handle);
rentalRoutes.post(
  "/devolution/:id",
  ensureAuth,
  devolutionRentalController.handle
);
rentalRoutes.get("/user", ensureAuth, listRentalsByUserController.handle);

export { rentalRoutes };
