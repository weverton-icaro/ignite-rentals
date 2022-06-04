import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/Accounts/dtos/IUserResponseDTO";
import { UserMap } from "@modules/Accounts/Mapper/UserMap";
import { IUsersRepository } from "@modules/Accounts/repositories/IUsersRepository";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);
    return UserMap.toDTO(user);
  }
}
