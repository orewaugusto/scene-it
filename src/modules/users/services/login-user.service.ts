import { UserRepositoryInterface } from "../repositories/interfaces/user-repository.interface";
import { UserRepository } from "../repositories/users.repository";
import { LoginUserServiceInterface } from "./interfaces/login-user.service.interface";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export class LoginUserService implements LoginUserServiceInterface {
  constructor(
    private userRepository: UserRepositoryInterface,
    private tokenSecret: string
  ) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("No user with this email");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password is incorrect");
    }

    if (!this.tokenSecret) {
      throw new Error("Token doesn't exist");
    }

    return jwt.sign({ id: user.id }, this.tokenSecret, { expiresIn: '1d' });
  }
}


