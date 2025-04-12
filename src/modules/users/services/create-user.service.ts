import { User } from "@prisma/client";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { CreateUserServiceInterface } from "./interfaces/create-user-service.interface";
import { UserRepositoryInterface } from "../repositories/interfaces/user-repository.interface";


export class CreateUserService implements CreateUserServiceInterface{
  constructor(
    private userRepository: UserRepositoryInterface
  ){}

  async execute({ email, username, password }: CreateUserDTO): Promise<User> {
    const userWithEmail = await this.userRepository.findUserByEmail(email);
    if (userWithEmail){
      throw new Error("Email já cadastrado.");
    }
    const newUser = await this.userRepository.createUser({email, username, password});
    return newUser;
  }
  
}