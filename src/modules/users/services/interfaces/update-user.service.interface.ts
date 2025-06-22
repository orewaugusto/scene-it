import { UpdateUserDTO } from "../../dtos/update-user.dto";

export interface UpdateUserServiceInterface {
  execute: (id: number, data: UpdateUserDTO) => Promise<void>;
}
