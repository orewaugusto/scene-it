import { User } from "@prisma/client";
import { CreateUserDTO } from "../../dtos/create-user.dto";

export interface UserRepositoryInterface {
  findUserById(id: number): Promise<User | null>
  findUserByEmail(email: string): Promise<User | null>
  createUser({ }: CreateUserDTO): Promise<User>
  deleteUserById(id: number): Promise<void>
}
