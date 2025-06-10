import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDTO {
  @IsNotEmpty()
  @IsString()
  password!: string;
  @IsNotEmpty()
  @IsString()
  email!: string;
}
