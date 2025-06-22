import { User } from "@prisma/client";
import { CreateUserDTO } from "../../dtos/create-user.dto";
import { UpdateUserDTO } from "../../dtos/update-user.dto";

export interface UserRepositoryInterface {
  findUserById(id: number): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  // eslint-disable-next-line no-empty-pattern
  createUser({}: CreateUserDTO): Promise<User>;
  // eslint-disable-next-line no-empty-pattern
  updateUserById(id: number, {}: UpdateUserDTO): Promise<void>;
  deleteUserById(id: number): Promise<void>;
}
