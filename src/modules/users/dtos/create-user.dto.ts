import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  username!: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email!: string;
}
