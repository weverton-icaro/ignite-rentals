import { ICreateUserDTO } from "@modules/Accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/Accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensRepositoryInMemory } from "@modules/Accounts/repositories/in-memory/UserTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { AuthUserUseCase } from "./AuthUserUseCase";

let authUserUseCase: AuthUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UserTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createUserUseCase: CreateUserUseCase;

const user: ICreateUserDTO = {
  driver_license: "000123321",
  email: "user@test.com",
  password: "123321123",
  name: "User Test",
};

describe("Authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensRepositoryInMemory = new UserTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authUserUseCase = new AuthUserUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able authenticate a user", async () => {
    await createUserUseCase.execute(user);

    const result = await authUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an not existent user", async () => {
    await expect(
      authUserUseCase.execute({
        email: "fake@email.com",
        password: "147852123",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });

  it("Should not be able to authenticate with incorrect password", async () => {
    await createUserUseCase.execute(user);
    await expect(
      authUserUseCase.execute({
        email: user.email,
        password: "123321",
      })
    ).rejects.toEqual(new AppError("Email or password incorrect"));
  });
});
