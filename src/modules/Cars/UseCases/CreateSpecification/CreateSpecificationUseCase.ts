import { inject, injectable } from "tsyringe";

import { ICreateSpecificationDTO } from "@modules/Cars/DTOs/ICreateSpecificationDTO";
import { ISpecificationRepository } from "@modules/Cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError(`Specification already exists`);
    }

    await this.specificationsRepository.create({
      name,
      description,
    });
  }
}

export { CreateSpecificationUseCase };
