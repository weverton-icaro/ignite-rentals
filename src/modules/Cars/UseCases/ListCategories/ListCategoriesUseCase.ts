import { inject, injectable } from "tsyringe";

import { Category } from "@modules/Cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/Cars/repositories/ICategoriesRepository";

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}
