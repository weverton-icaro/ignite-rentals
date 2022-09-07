import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

export class UserMap {
  static toDTO({
    email,
    id,
    name,
    driver_license,
    avatar,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      id,
      name,
      driver_license,
      avatar,
      avatar_url,
    });
    return user;
  }
}
