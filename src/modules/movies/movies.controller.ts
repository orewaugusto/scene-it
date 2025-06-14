import { Request, Response } from "express";
import { CreateMovieDTO } from "./dtos/create-movie.dto";
import { CreateMovieService } from "./services/create-movie.service";
import { MoviesRepositoryInterface } from "./repositories/interfaces/movies-repository.interface";
import { MoviesRepository } from "./repositories/movies.repository";
import { CreateMovieServiceInterface } from "./services/interfaces/create-movie.service.interface";

export class MoviesController {
  constructor(
    private moviesRepository: MoviesRepositoryInterface = new MoviesRepository(),
    private createMovieService: CreateMovieServiceInterface = new CreateMovieService(
      moviesRepository
    )
  ) {}

  async findMoviesByTitle(req: Request, res: Response) {
    try {
      const { title } = req.query;

      if (typeof title !== "string" || !title.trim()) {
        return res
          .status(400)
          .json({ message: "Título inválido ou não fornecido." });
      }

      const movies = await this.moviesRepository.findMoviesByTitle(title);

      res.status(200).json(movies);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: "Erro ao buscar filmes." });
    }
  }
}
