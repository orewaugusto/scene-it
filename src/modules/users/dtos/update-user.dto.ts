import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from "class-validator";

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(256)
  bio?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  avatarUrl?: string;
}
