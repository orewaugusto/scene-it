import { User } from "@prisma/client";
import { CreateUserDTO } from "../../dtos/create-user.dto";

export interface UserRepositoryInterface {
  findUserByEmail(email: string): Promise<User | null>;
  createUser({}: CreateUserDTO): Promise<User>;
}
