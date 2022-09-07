import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/Cars/UseCases/CreateCategory/CreateCategoryController";
import { ImportCategoriesController } from "@modules/Cars/UseCases/ImportCategories/ImportCategoriesController";
import { ListCategoriesController } from "@modules/Cars/UseCases/ListCategories/ListCategoriesController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuth } from "@shared/infra/http/middlewares/ensureAuth";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

const importCategoriesController = new ImportCategoriesController();

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.use(ensureAuth);

categoriesRoutes.post("/", ensureAdmin, createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAdmin,
  importCategoriesController.handle
);

export { categoriesRoutes };
