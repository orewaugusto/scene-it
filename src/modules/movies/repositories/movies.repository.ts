import { PrismaClient, Movie } from "@prisma/client";
import { CreateMovieDTO } from "../dtos/create-movie.dto";
import {
  MoviesRepositoryInterface,
  PaginatedMovies,
} from "./interfaces/movies-repository.interface";

export class MoviesRepository implements MoviesRepositoryInterface {
  constructor(private prisma = new PrismaClient()) {}

  async findMovies(
    title: string | undefined,
    limit: number,
    offset: number,
  ): Promise<PaginatedMovies> {
    const whereClause = title
      ? {
          title: {
            contains: title,
          },
        }
      : {};

    const movies = await this.prisma.movie.findMany({
      where: whereClause,
      take: limit,
      skip: offset,
      orderBy: {
        title: "asc",
      },
    });

    const totalCount = await this.prisma.movie.count({
      where: whereClause,
    });

    return { movies, totalCount };
  }

  async createMovie(movieData: CreateMovieDTO): Promise<Movie> {
    return await this.prisma.movie.create({
      data: movieData,
    });
  }
}
