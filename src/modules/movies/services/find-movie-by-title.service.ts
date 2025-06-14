import { MoviesRepositoryInterface } from "../repositories/interfaces/movies-repository.interface";
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
    private movieRepository: MoviesRepositoryInterface
  ) {}

  async execute(title: string): Promise<MovieEntity[]> {
    const movieFromDatabase = await this.movieRepository.findMoviesByTitle(
      title
    );
    if (movieFromDatabase) {
      return movieFromDatabase!;
    }

    const response = await this.tmdbRepository.findMoviesByTitle(title);
    if (!response) {
      throw "No results found";
    }

    return response;
  }
}
