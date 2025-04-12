import { Request, Response } from "express";
import { CreateUserDTO } from "./dtos/create-user.dto";

export class UsersController {
   async createUser(req: Request, res: Response){
    try {
      const {email, username, password} = req.body as CreateUserDTO;
    
  
    const user = await UserService.createUser({email, username, password});
  
    res.status(201).json(user);
    } catch (error){
      console.error(error);
    }
  }
}
