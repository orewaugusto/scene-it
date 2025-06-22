import { Request, Response } from "express";
import { MoviesRepositoryInterface } from "./repositories/interfaces/movies-repository.interface";
import { TMDBRepositoryInterface } from "./repositories/interfaces/tmdb-repository.interface";
import { MoviesRepository } from "./repositories/movies.repository";
import { TMDBRepository } from "./repositories/tmdb.repository";
import { FindMoviesByTitleService } from "./services/find-movie-by-title.service";
import { FindMoviesByTitleServiceInterface } from "./services/interfaces/find-movies-by-title-service.interface";

export class MoviesController {
  private tmdbRepository: TMDBRepositoryInterface;
  private moviesRepository: MoviesRepositoryInterface;
  private findMoviesByTitleService: FindMoviesByTitleServiceInterface;

  constructor() {
    this.tmdbRepository = new TMDBRepository();
    this.moviesRepository = new MoviesRepository();
    this.findMoviesByTitleService = new FindMoviesByTitleService(
      this.tmdbRepository,
      this.moviesRepository,
    );
  }

  async findMoviesByTitle(req: Request, res: Response) {
    try {
      const { title, page = "1", limit = "20" } = req.query;

      const pageNumber = parseInt(page as string);
      const limitNumber = parseInt(limit as string);

      if (
        isNaN(pageNumber) ||
        pageNumber < 1 ||
        isNaN(limitNumber) ||
        limitNumber < 1
      ) {
        return res.status(400).json({
          message:
            "Invalid page or limit provided. Page and limit must be positive integers.",
        });
      }

      const moviesResult = await this.findMoviesByTitleService.execute(
        typeof title === "string" ? title.trim() : undefined,
        pageNumber,
        limitNumber,
      );

      if ("movies" in moviesResult && "totalCount" in moviesResult) {
        res.status(200).json(moviesResult);
      } else {
        res.status(200).json({
          movies: moviesResult,
          totalCount: moviesResult.length,
          currentPage: pageNumber,
          limit: limitNumber,
        });
      }
    } catch (error: unknown) {
      console.error(error);
      if (error === "No results found") {
        return res.status(404).json({
          message: "No movies found with that title on TMDB or in database.",
        });
      }
      res.status(500).json({
        message: "Error fetching movies.",
        error: (error as Error)?.message || "Unknown error",
      });
    }
  }
}
