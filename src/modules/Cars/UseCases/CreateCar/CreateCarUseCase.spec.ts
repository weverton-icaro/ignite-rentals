import { CarsRepositoryInMemory } from "@modules/Cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC1234",
      brand: "Brand Car",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABC1234",
      brand: "Brand Car",
      category_id: "category",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car2",
        description: "Description Car",
        daily_rate: 100,
        fine_amount: 60,
        license_plate: "ABC1234",
        brand: "Brand Car",
        category_id: "category",
      })
    ).rejects.toEqual(new AppError("Car already exists."));
  });

  it("should not be able to create a car with Available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description Car",
      daily_rate: 100,
      fine_amount: 60,
      license_plate: "ABCD1234",
      brand: "Brand Car",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
