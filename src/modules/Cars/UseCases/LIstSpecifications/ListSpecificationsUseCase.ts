import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/Cars/infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "@modules/Cars/repositories/ISpecificationRepository";

@injectable()
export class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();

    return specifications;
  }
}
