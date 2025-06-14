import { User } from "@prisma/client";
import { UserRepositoryInterface } from "./interfaces/user-repository.interface";
import { CreateUserDTO } from "../dtos/create-user.dto";

export class UserRepositoryMock implements UserRepositoryInterface {
  public db: User[] = [];

  async findUserById(id: number): Promise<User | null> {
    const userFound = this.db.find(user => user.id === id);

    if (!userFound) {
      return null;
    }

    return userFound;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userExists = this.db.find(user => user.email === email);

    if (!userExists) {
      return null;
    }

    return userExists;
  }

  async createUser({ username, password, email }: CreateUserDTO): Promise<User> {
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

  async deleteUserById(id: number): Promise<void> {
    const idx = this.db.findIndex(user => user.id === id);

    if (idx >= 0) {
      this.db.splice(idx, 1)[0];
    }
  }
}
