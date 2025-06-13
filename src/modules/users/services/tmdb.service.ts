import axios from "axios";
import { TMDBServiceInterface } from "./interfaces/tmdb.service.interface";
import { CreateMovieDTO } from "../dtos/create-movie.dto";

export class TMDBService implements TMDBServiceInterface {
  private readonly baseURL = "https://api.themoviedb.org/3";
  private readonly apiKey: string;

  constructor() {
    if (!process.env.TMDB_API_KEY) {
      throw new Error("TMDB_API_KEY not set in environment variables");
    }
    this.apiKey = process.env.TMDB_API_KEY;
  }

  async searchMoviesByTitle(title: string): Promise<CreateMovieDTO[]> {
    const response = await axios.get(`${this.baseURL}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: title,
        language: "en-US",
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return response.data.results.map((movie: any) =>
      this.transformToDTO(movie),
    );
  }

  async getMovieById(tmdbId: string): Promise<CreateMovieDTO | null> {
    try {
      const response = await axios.get(`${this.baseURL}/movie/${tmdbId}`, {
        params: {
          api_key: this.apiKey,
          language: "en-US",
        },
      });
      return this.transformToDTO(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private transformToDTO(movie: any): CreateMovieDTO {
    const releaseYear = movie.release_date
      ? parseInt(movie.release_date.slice(0, 4))
      : new Date().getFullYear();

    return {
      title: movie.title,
      description: movie.overview || undefined,
      releaseYear,
      posterUrl: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : undefined,
    };
  }
}
