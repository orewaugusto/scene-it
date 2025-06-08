import { User } from "@prisma/client";
import { UserRepositoryInterface } from "./interfaces/user-repository.interface";
import { CreateUserDTO } from "../dtos/create-user.dto";

export class UserRepositoryMock implements UserRepositoryInterface {
  constructor(
    private db: User[] = []
  ){}

  async findUserByEmail(email: string): Promise<User | null> {
    const userExists = this.db.find(user => user.email === email);

    if(!userExists){
      return null;
    }

    return userExists;
  }

  async createUser({username, password, email}: CreateUserDTO): Promise<User> {
    const newUser: User = {
      username: username,
      password: password,
      email: email,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: this.db.length,
      bio: "",
      avatarUrl: ""
    }

    console.log(newUser);
    
    this.db.push(newUser);
    return newUser;
  }
}