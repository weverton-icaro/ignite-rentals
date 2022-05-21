import { SpecificationRepositoryInMemory } from "@modules/Cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Specifications Class", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryInMemory
    );
  });

  it("should be able create a new  class specification", async () => {
    const specification = {
      name: "Specification Test",
      description: " Specification description Test",
    };

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    });

    const specificationCreated =
      await specificationsRepositoryInMemory.findByName(specification.name);

    expect(specificationCreated).toHaveProperty("id");
  });

  it("should not be able to create a new specification with name exists", async () => {
    const specification = {
      name: "Specification Test",
      description: "Specification description Test",
    };

    await createSpecificationUseCase.execute({
      name: specification.name,
      description: specification.description,
    });

    await expect(
      createSpecificationUseCase.execute({
        name: specification.name,
        description: specification.description,
      })
    ).rejects.toEqual(new AppError("Specification already exists"));
  });
});
