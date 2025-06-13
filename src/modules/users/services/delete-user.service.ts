import { UserRepositoryInterface } from "../repositories/interfaces/user-repository.interface";
import { DeleteUserServiceInterface } from "./interfaces/delete-user-service.interface";

export class DeleteUserService implements DeleteUserServiceInterface {
  constructor(private usersRepository: UserRepositoryInterface) { }

  async execute(id: number): Promise<void> {
    const userFound = await this.usersRepository.findUserById(id);

    if (!userFound) {
      throw new Error("user not found");
    }

    await this.usersRepository.deleteUserById(id);
  }
}
