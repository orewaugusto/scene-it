import { Request, Response } from "express";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { CreateUserService } from "./services/create-user.service";
import { CreateUserServiceInterface } from "./services/interfaces/create-user-service.interface";
import { UserRepositoryInterface } from "./repositories/interfaces/user-repository.interface";
import { UserRepository } from "./repositories/users.repository";

export class UsersController {
  constructor(
    private userRepository: UserRepositoryInterface = new UserRepository(),
    private createUserService: CreateUserServiceInterface = new CreateUserService(userRepository)
  ){}

  async createUser(req: Request, res: Response){
    try {
      const {email, username, password} = req.body as CreateUserDTO;
    
    const newUser = await this.createUserService.execute({email, username, password});
  
    res.status(201).json(newUser);
    } catch (error){
      console.error(error);
    }
  }
}
