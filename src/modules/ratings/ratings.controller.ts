import { Request, Response } from "express";
import { CreateRatingDTO } from "./dtos/create-rating.dto";
import { validate } from "class-validator";
import { RatingsRepositoryInterface } from "./repositories/interfaces/ratings-repository.interface";
import { RatingsRepository } from "./repositories/ratings.repository";
import { CreateRatingService } from "./services/create-rating.service";
import { CreateRatingServiceInterface } from "./services/interfaces/create-rating.service.interface";

export class RatingsController {
  constructor(
    private ratingsRepository: RatingsRepositoryInterface = new RatingsRepository(),
    private createRatingService: CreateRatingServiceInterface = new CreateRatingService(
      ratingsRepository
    )
  ) {}

  async createRating(req: Request, res: Response): Promise<Response> {
    try {
      const dto = new CreateRatingDTO();
      dto.userId = req.body.userId;
      dto.movieId = req.body.movieId;
      dto.rating = req.body.rating;
      dto.review = req.body.review;

      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ message: "Invalid data", errors });
      }

      const newRating = await this.createRatingService.execute(dto);

      return res.status(201).json(newRating);
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao criar avaliação.", error: error.message });
    }
  }
}
