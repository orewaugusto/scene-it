import { UserRepositoryInterface } from "../repositories/interfaces/user-repository.interface";
import { UserWithoutPassword } from "../types/user-without-password.type";
import { GetUserByIdServiceInterface } from "./interfaces/get-user-by-id-service.interface";

export class GetUserByIdService implements GetUserByIdServiceInterface {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: number): Promise<UserWithoutPassword | null> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new Error(`User not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
