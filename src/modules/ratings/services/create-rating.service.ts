import { Rating } from "@prisma/client";
import { CreateRatingDTO } from "../dtos/create-rating.dto";
import { RatingsRepositoryInterface } from "../repositories/interfaces/ratings-repository.interface";
import { CreateRatingServiceInterface } from "./interfaces/create-rating.service.interface";

export class CreateRatingService implements CreateRatingServiceInterface {
  constructor(private ratingsRepository: RatingsRepositoryInterface) {}

  async execute(data: CreateRatingDTO): Promise<Rating> {
    return this.ratingsRepository.create(data);
  }
}
