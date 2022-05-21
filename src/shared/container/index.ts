import "reflect-metadata";
import { container } from "tsyringe";

import "@shared/container/providers";

import { UsersRepository } from "@modules/Accounts/infra/typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "@modules/Accounts/infra/typeorm/repositories/UserTokensRepository";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/Accounts/repositories/IUserTokensRepository";
import { CarImagesRepository } from "@modules/Cars/infra/typeorm/repositories/CarImagesRepository";
import { CarsRepository } from "@modules/Cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/Cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/Cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarImagesRepository } from "@modules/Cars/repositories/ICarImagesRepository";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/Cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/Cars/repositories/ISpecificationRepository";
import { RentalsRepository } from "@modules/Rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/Rentals/repositories/IRentalsRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);

container.registerSingleton<IRentalsRepository>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);
