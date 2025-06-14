import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  MaxLength,
} from "class-validator";

export class CreateMovieDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1888)
  releaseYear!: number;

  @IsOptional()
  @IsString()
  @IsUrl()
  posterUrl?: string;
}
