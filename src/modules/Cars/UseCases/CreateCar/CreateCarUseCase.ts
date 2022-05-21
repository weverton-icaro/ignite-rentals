import { inject, injectable } from "tsyringe";

import { ICreateCarDTO } from "@modules/Cars/DTOs/ICreateCarDTO";
import { Car } from "@modules/Cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists.");
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      brand,
      category_id,
    });

    return car;
  }
}
