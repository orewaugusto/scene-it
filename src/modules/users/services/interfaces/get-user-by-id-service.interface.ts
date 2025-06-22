import { UserWithoutPassword } from "../../types/user-without-password.type";

export interface GetUserByIdServiceInterface {
  execute(id: number): Promise<UserWithoutPassword | null>;
}
