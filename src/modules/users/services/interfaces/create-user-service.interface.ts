import { User } from "@prisma/client";
import { CreateUserDTO } from "../../dtos/create-user.dto";

export interface CreateUserServiceInterface {
  execute: (_:CreateUserDTO) => Promise <User>;
}