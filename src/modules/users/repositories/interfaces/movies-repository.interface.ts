import { Movie } from "@prisma/client"
import { CreateMovieDTO } from "../../dtos/create-movie.dto"

export interface MoviesRepositoryInterface {
  findMoviesByTitle(title: string): Promise<Movie[]>
  createMovie(movieData: CreateMovieDTO): Promise<Movie>
}