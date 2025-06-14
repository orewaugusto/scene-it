import { CreateUserDTO } from "../../dtos/create-user.dto";
import { UserWithoutPassword } from "../../types/user-without-password.type";

export interface CreateUserServiceInterface {
  execute: (_: CreateUserDTO) => Promise<UserWithoutPassword>;
}
