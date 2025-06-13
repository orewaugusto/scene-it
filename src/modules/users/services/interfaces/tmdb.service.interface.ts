import { CreateMovieDTO } from "../../dtos/create-movie.dto";

export interface TMDBServiceInterface {
  searchMoviesByTitle(title: string): Promise<CreateMovieDTO[]>;
  getMovieById(tmdbId: string): Promise<CreateMovieDTO | null>;
}
