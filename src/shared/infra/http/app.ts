/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/container";

import upload from "@config/upload";
import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";
import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";

import swaggerFile from "../../../swagger.json";
import { router } from "@shared/infra/http/routes";


createConnection();
const app = express();

app.use(rateLimiter)

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/car", express.static(`${upload.tmpFolder}/car`));

app.use(cors());
app.use(router);

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
