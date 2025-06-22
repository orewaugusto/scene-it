import { MovieEntity } from "../../repositories/interfaces/tmdb-repository.interface";
import { PaginatedMovies } from "../../repositories/interfaces/movies-repository.interface"; // New import

export interface FindMoviesByTitleServiceInterface {
  execute(
    title: string | undefined,
    page: number,
    limit: number,
  ): Promise<PaginatedMovies | MovieEntity[]>;
}
