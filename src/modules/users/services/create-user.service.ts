import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { CreateUserServiceInterface } from "./interfaces/create-user-service.interface";
import { UserRepositoryInterface } from "../repositories/interfaces/user-repository.interface";
import { UserWithoutPassword } from "../types/user-without-password.type";

export class CreateUserService implements CreateUserServiceInterface {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    email,
    username,
    password,
  }: CreateUserDTO): Promise<UserWithoutPassword> {
    const userWithEmail = await this.userRepository.findUserByEmail(email);
    if (userWithEmail) {
      throw new Error("Email já cadastrado.");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    console.log(salt);

    const newUser = await this.userRepository.createUser({
      email,
      username,
      password: hash,
    });

    const { password: _password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }
}
