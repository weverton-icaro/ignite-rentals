import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IResetPasswordDTO } from "@modules/Accounts/dtos/IResetPasswordDTO";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "@modules/Accounts/repositories/IUserTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IResetPasswordDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid");
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow()
      )
    ) {
      throw new AppError("Token expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}
