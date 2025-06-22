import { Movie } from "@prisma/client";
import { CreateMovieDTO } from "../../dtos/create-movie.dto";

export interface PaginatedMovies {
  movies: Movie[];
  totalCount: number;
}

export interface MoviesRepositoryInterface {
  findMovies(
    title: string | undefined,
    limit: number,
    offset: number,
  ): Promise<PaginatedMovies>;
  createMovie(movieData: CreateMovieDTO): Promise<Movie>;
}
