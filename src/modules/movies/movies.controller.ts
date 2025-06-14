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
      const { title } = req.query;

      if (typeof title !== "string" || !title.trim()) {
        return res
          .status(400)
          .json({ message: "Título inválido ou não fornecido." });
      }

      const movies = await this.findMoviesByTitleService.execute(title);

      res.status(200).json(movies);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar filmes." });
    }
  }
}
