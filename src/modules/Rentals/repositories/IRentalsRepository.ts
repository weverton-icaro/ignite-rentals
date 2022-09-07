import { IRentalDTO } from "@modules/Rentals/DTOs/IRentalDTO";

import { Rentals } from "../infra/typeorm/entities/Rentals";

export interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rentals>;
  findOpenRentalByUser(user_id: string): Promise<Rentals>;
  findById(id: string): Promise<Rentals>;
  findByUser(user_id: string): Promise<Rentals[]>;
  create({
    car_id,
    user_id,
    expected_return_date,
  }: IRentalDTO): Promise<Rentals>;
}
