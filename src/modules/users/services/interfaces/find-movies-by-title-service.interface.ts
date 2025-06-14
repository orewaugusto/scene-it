import { MovieEntity } from "../../repositories/interfaces/tmdb-repository.interface";

export interface FindMoviesByTitleServiceInterface {
  execute(title: string): Promise<MovieEntity[]>;
}
