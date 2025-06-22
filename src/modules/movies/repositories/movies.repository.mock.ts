import { Movie } from "@prisma/client";
import { CreateMovieDTO } from "../dtos/create-movie.dto";
import {
  MoviesRepositoryInterface,
  PaginatedMovies,
} from "./interfaces/movies-repository.interface";

export class MoviesRepositoryMock implements MoviesRepositoryInterface {
  private db: Movie[] = [];
  private currentId = 1;

  async findMovies(
    title: string | undefined,
    limit: number,
    offset: number,
  ): Promise<PaginatedMovies> {
    let filteredMovies = this.db;

    if (title) {
      filteredMovies = this.db.filter((movie) =>
        movie.title.toLowerCase().includes(title.toLowerCase()),
      );
    }

    const paginatedMovies = filteredMovies.slice(offset, offset + limit);

    return { movies: paginatedMovies, totalCount: filteredMovies.length };
  }

  async createMovie(movieData: CreateMovieDTO): Promise<Movie> {
    const existingMovie = this.db.find(
      (movie) =>
        movie.title === movieData.title &&
        movie.releaseYear === movieData.releaseYear,
    );

    if (existingMovie) {
      throw new Error(
        "Film already exists with the same title and release year.",
      );
    }

    const newMovie: Movie = {
      id: this.currentId++,
      title: movieData.title,
      description: movieData.description || null,
      releaseYear: movieData.releaseYear,
      posterUrl: movieData.posterUrl || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.db.push(newMovie);
    return newMovie;
  }
}
