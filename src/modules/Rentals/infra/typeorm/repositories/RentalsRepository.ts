import { getRepository, Repository } from "typeorm";

import { IRentalDTO } from "@modules/Rentals/DTOs/IRentalDTO";
import { IRentalsRepository } from "@modules/Rentals/repositories/IRentalsRepository";

import { Rentals } from "../entities/Rentals";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rentals>;

  constructor() {
    this.repository = getRepository(Rentals);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: IRentalDTO): Promise<Rentals> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rentals> {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null,
      },
    });
    return openByCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rentals> {
    const openByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: null,
      },
    });
    return openByUser;
  }

  async findById(id: string): Promise<Rentals> {
    const rental = await this.repository.findOne(id);
    return rental;
  }

  async findByUser(user_id: string): Promise<Rentals[]> {
    const rental = await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });
    return rental;
  }
}
