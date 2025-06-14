import { PrismaClient, Movie } from "@prisma/client";
import { CreateMovieDTO } from "../dtos/create-movie.dto";
import { MoviesRepositoryInterface } from "./interfaces/movies-repository.interface";

export class MoviesRepository implements MoviesRepositoryInterface {
  constructor(private prisma = new PrismaClient()) {}

  async findMoviesByTitle(title: string): Promise<Movie[]> {
    return await this.prisma.movie.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive",
        },
      },
    });
  }

  async createMovie(movieData: CreateMovieDTO): Promise<Movie> {
    return await this.prisma.movie.create({
      data: movieData,
    });
  }
}
