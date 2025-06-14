import { Movie } from "@prisma/client";
import { CreateMovieDTO } from "../../dtos/create-movie.dto";

export interface CreateMovieServiceInterface {
  execute(data: CreateMovieDTO): Promise<Movie>;
}
