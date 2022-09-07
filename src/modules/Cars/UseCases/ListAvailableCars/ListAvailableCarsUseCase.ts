import { inject, injectable } from "tsyringe";

import { IListAvailableCarsDTO } from "@modules/Cars/DTOs/IListAvailableCarsDTO";
import { Car } from "@modules/Cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    name,
    brand,
    category_id,
  }: IListAvailableCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      name,
      category_id
    );
    return cars;
  }
}
