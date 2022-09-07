import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/Cars/DTOs/ICreateCarDTO";
import { ICarsRepository } from "@modules/Cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    brand,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      brand,
      category_id,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async list(): Promise<Car[]> {
    const cars = await this.repository.find();

    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("cars")
      .where("Available = :Available", { Available: true });

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", {
        category_id,
      });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne({ id });
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}
