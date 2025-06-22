import {
  MoviesRepositoryInterface,
  PaginatedMovies,
} from "../repositories/interfaces/movies-repository.interface";
import {
  MovieEntity,
  TMDBRepositoryInterface,
} from "../repositories/interfaces/tmdb-repository.interface";
import { FindMoviesByTitleServiceInterface } from "./interfaces/find-movies-by-title-service.interface";

export class FindMoviesByTitleService
  implements FindMoviesByTitleServiceInterface
{
  constructor(
    private tmdbRepository: TMDBRepositoryInterface,
    private movieRepository: MoviesRepositoryInterface,
  ) {}

  async execute(
    title: string | undefined,
    page: number,
    limit: number,
  ): Promise<PaginatedMovies | MovieEntity[]> {
    const offset = (page - 1) * limit;

    if (!title || title.trim() === "") {
      const { movies, totalCount } = await this.movieRepository.findMovies(
        undefined,
        limit,
        offset,
      );
      return { movies, totalCount };
    }

    const { movies: moviesFromDatabase, totalCount: totalCountDatabase } =
      await this.movieRepository.findMovies(title, limit, offset);

    if (moviesFromDatabase.length > 0) {
      return { movies: moviesFromDatabase, totalCount: totalCountDatabase };
    }

    const moviesFromTmdb = await this.tmdbRepository.findMoviesByTitle(title);
    if (!moviesFromTmdb || moviesFromTmdb.length === 0) {
      throw "No results found";
    }

    return moviesFromTmdb;
  }
}
