import { IsInt, IsNotEmpty, IsString, Max, Min, MaxLength } from "class-validator";

export class CreateRatingDTO {
  @IsNotEmpty()
  @IsInt()
  userId!: number;

  @IsNotEmpty()
  @IsInt()
  movieId!: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(10)
  rating!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  review!: string;
}
