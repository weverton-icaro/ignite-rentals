import { inject, injectable } from "tsyringe";

import { Car } from "@modules/Cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";

@injectable()
export class ListAllCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    const cars = await this.carsRepository.list();
    return cars;
  }
}
