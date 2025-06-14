// create-movie.service.ts
import { CreateMovieDTO } from "../dtos/create-movie.dto";
import { Movie } from "@prisma/client";
import { MoviesRepositoryInterface } from "../repositories/interfaces/movies-repository.interface";
import { CreateMovieServiceInterface } from "./create-movie.service.interface";

export class CreateMovieService implements CreateMovieServiceInterface {
  constructor(private moviesRepository: MoviesRepositoryInterface) {}

  async execute(data: CreateMovieDTO): Promise<Movie> {
    const existingMovies = await this.moviesRepository.findMoviesByTitle(data.title);

    const alreadyExists = existingMovies.some(
      (movie) => movie.releaseYear === data.releaseYear
    );

    if (alreadyExists) {
      throw new Error("Filme já cadastrado com esse título e ano de lançamento.");
    }

    return this.moviesRepository.createMovie(data);
  }
}
