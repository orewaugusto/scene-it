import { Movie } from "@prisma/client";
import { CreateMovieDTO } from "../../dtos/create-movie.dto";

export interface MovieRepositoryInterface {
  findById(id: string): Promise<Movie | null>;
  findByTitle(title: string): Promise<Movie[]>;
  createMovie(movieData: CreateMovieDTO): Promise<Movie>;
}
