import { Router } from "express";

import { accountsRoutes } from "./accounts.routes";
import { authRoute } from "./auth.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rentals.routes";
import { specificationsRoutes } from "./specifications.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/accounts", accountsRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use("/password", passwordRoutes);
router.use(authRoute);

export { router };
