import { CreateMovieDTO } from "../../dtos/create-movie.dto";

export interface MovieEntity {
  title: string;
  description: string | null;
  releaseYear: number;
  posterUrl: string | null;
}

export interface TMDBRepositoryInterface {
  findMoviesByTitle(title: string): Promise<MovieEntity[]| null>
}