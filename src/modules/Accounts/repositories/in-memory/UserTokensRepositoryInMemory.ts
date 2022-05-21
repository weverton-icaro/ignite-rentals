import { ICreateUserTokenDTO } from "@modules/Accounts/dtos/ICreateUserTokenDTO";
import { UserTokens } from "@modules/Accounts/infra/typeorm/entities/UserTokens";

import { IUserTokensRepository } from "../IUserTokensRepository";

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  userTokens: UserTokens[] = [];

  async create({
    expires_date,
    user_id,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      user_id,
      refresh_token,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find((user) => user.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }
}
