import { User, PrismaClient } from "@prisma/client";

import { UserRepositoryInterface } from "./interfaces/user-repository.interface";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UpdateUserDTO } from "../dtos/update-user.dto";

export class UserRepository implements UserRepositoryInterface {
  constructor(private prisma = new PrismaClient()) { }

  async findUserById(id: number) {
    const userFound = await this.prisma.user.findUnique({
      where: {
        id,
      }
    })

    return userFound;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return userExists;
  }

  async createUser({
    email,
    password,
    username,
  }: CreateUserDTO): Promise<User> {
    const newUser = await this.prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });

    return newUser;
  }

  async updateUserById(id: number, { bio }: UpdateUserDTO): Promise<void> {
    await this.prisma.user.update({
      where: {
        id
      },
      data: { bio }
    })
  }

  async deleteUserById(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id
      }
    });
  }
}
