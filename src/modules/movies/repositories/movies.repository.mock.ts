import { Movie } from "@prisma/client";
import { CreateMovieDTO } from "../dtos/create-movie.dto";
import { MoviesRepositoryInterface } from "./interfaces/movies-repository.interface";

export class MoviesRepositoryMock implements MoviesRepositoryInterface {
  private db: Movie[] = [];

  async findMoviesByTitle(title: string): Promise<Movie[]> {
    return this.db.filter((movie) =>
      movie.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  async createMovie(movieData: CreateMovieDTO): Promise<Movie> {
    const newMovie: Movie = {
      id: this.db.length,
      title: movieData.title,
      description: movieData.description!,
      releaseYear: movieData.releaseYear,
      posterUrl: movieData.posterUrl!,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.db.push(newMovie);
    return newMovie;
  }
}
