import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(256)
  bio!: string;
}
