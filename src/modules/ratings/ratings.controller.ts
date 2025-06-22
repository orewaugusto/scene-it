import { validate } from "class-validator";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";
import { CreateRatingDTO } from "./dtos/create-rating.dto";
import { RatingsRepositoryInterface } from "./repositories/interfaces/ratings-repository.interface";
import { RatingsRepository } from "./repositories/ratings.repository";
import { CreateRatingService } from "./services/create-rating.service";
import { CreateRatingServiceInterface } from "./services/interfaces/create-rating.service.interface";
import { FindRatingsByMovieIdServiceInterface } from "./services/interfaces/find-ratings-by-movie-id-service.interface";
import { FindRatingsByMovieIdService } from "./services/find-ratings-by-movie-id.service";

export class RatingsController {
  constructor(
    private ratingsRepository: RatingsRepositoryInterface = new RatingsRepository(),
    private createRatingService: CreateRatingServiceInterface = new CreateRatingService(
      ratingsRepository,
    ),
    private findRatingsByMovieIdService: FindRatingsByMovieIdServiceInterface = new FindRatingsByMovieIdService(
      ratingsRepository,
    ),
  ) {}

  async createRating(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        res.status(401).json({ message: "User not authenticated." });
        return;
      }

      const dto = new CreateRatingDTO();
      dto.userId = req.userId;
      dto.movieId = req.body.movieId;
      dto.rating = req.body.rating;
      dto.review = req.body.review;

      const errors = await validate(dto);
      if (errors.length > 0) {
        res.status(400).json({ message: "Invalid data", errors });
        return;
      }

      const newRating = await this.createRatingService.execute(dto);

      res.status(201).json(newRating);
      return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Erro ao criar avaliação.", error: error.message });
      return;
    }
  }

  async getRatingsByMovieId(req: Request, res: Response) {
    try {
      const { movieId } = req.params;
      const _movieId = Number(movieId);

      if (isNaN(_movieId)) {
        res.status(400).json({ message: "Invalid movie ID" });
        return;
      }

      const ratings = await this.findRatingsByMovieIdService.execute(_movieId);

      if (ratings.length === 0) {
        res.status(404).json({ message: "No ratings found for this movie." });
        return;
      }

      res.status(200).json(ratings);
    } catch (error: unknown) {
      console.error(error);
      res.status(500).json({
        message: "Error fetching ratings.",
        error: (error as Error)?.message || "Unknown error",
      });
      return;
    }
  }
}
