import { UpdateUserDTO } from "../dtos/update-user.dto";
import { UserRepositoryInterface } from "../repositories/interfaces/user-repository.interface";
import { UpdateUserServiceInterface } from "./interfaces/update-user.service.interface";

export class UpdateUserService implements UpdateUserServiceInterface {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute(id: number, updateData: UpdateUserDTO): Promise<void> {
    const userFound = await this.userRepository.findUserById(id);
    if (!userFound) {
      throw new Error("user not found");
    }

    await this.userRepository.updateUserById(userFound.id, updateData);
  }
}
