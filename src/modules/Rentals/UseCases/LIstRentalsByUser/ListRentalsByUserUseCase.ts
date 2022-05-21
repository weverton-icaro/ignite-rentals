import { inject, injectable } from "tsyringe";

import { Rentals } from "@modules/Rentals/infra/typeorm/entities/Rentals";
import { IRentalsRepository } from "@modules/Rentals/repositories/IRentalsRepository";

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}
  async execute(user_id: string): Promise<Rentals[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    return rentalsByUser;
  }
}
