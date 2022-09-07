import { inject, injectable } from "tsyringe";

import { ICreateCarSpecificationDTO } from "@modules/Cars/DTOs/ICreateCarSpecificationDTO";
import { Car } from "@modules/Cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";
import { ISpecificationRepository } from "@modules/Cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({
    car_id,
    specifications_id,
  }: ICreateCarSpecificationDTO): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car does not exists");
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);

    return carExists;
  }
}
