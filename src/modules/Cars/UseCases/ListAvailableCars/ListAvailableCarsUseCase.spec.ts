import { CarsRepositoryInMemory } from "@modules/Cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all Available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 80,
      fine_amount: 50,
      license_plate: "ABC1245",
      brand: "Car Brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 80,
      fine_amount: 50,
      license_plate: "ABC1256",
      brand: "Car Brand Test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car Brand Test",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 80,
      fine_amount: 50,
      license_plate: "ABC1267",
      brand: "Car Brand Test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car description",
      daily_rate: 80,
      fine_amount: 50,
      license_plate: "ABC1267",
      brand: "Car Brand Test",
      category_id: "12345",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "12345",
    });

    expect(cars).toEqual([car]);
  });
});
