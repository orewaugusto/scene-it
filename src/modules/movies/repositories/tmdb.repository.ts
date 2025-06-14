import { PrismaClient } from "@prisma/client";
import {
  MovieEntity,
  TMDBRepositoryInterface,
} from "./interfaces/tmdb-repository.interface";
import axios from "axios";
import { getYear } from "date-fns";

export class TMDBRepository implements TMDBRepositoryInterface {
  private readonly baseURL = "https://api.themoviedb.org/3";
  private readonly apiKey: string;

  constructor(private prisma = new PrismaClient()) {
    if (!process.env.TMDB_API_KEY) {
      throw new Error("TMDB_API_KEY not set in environment variables");
    }
    this.apiKey = process.env.TMDB_API_KEY;
  }

  async findMoviesByTitle(title: string): Promise<MovieEntity[] | null> {
    const response = await axios.get(`${this.baseURL}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: title,
        language: "en-US",
      },
    });
    return response.data.results.map((movie: any) => ({
      title: movie.title,
      description: movie.overview,
      releaseYear: getYear(new Date(movie.release_date)),
      posterUrl: movie.poster_path,
    }));
  }
}
