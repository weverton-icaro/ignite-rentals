import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/Accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists) {
      throw new AppError(`User email ${email} already exists`);
    }

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}
