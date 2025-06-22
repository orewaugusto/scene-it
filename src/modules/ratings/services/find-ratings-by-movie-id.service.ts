import { Rating } from "@prisma/client";
import { RatingsRepositoryInterface } from "../repositories/interfaces/ratings-repository.interface";
import { FindRatingsByMovieIdServiceInterface } from "./interfaces/find-ratings-by-movie-id-service.interface";

export class FindRatingsByMovieIdService
  implements FindRatingsByMovieIdServiceInterface
{
  constructor(private ratingsRepository: RatingsRepositoryInterface) {}

  async execute(movieId: number): Promise<Rating[]> {
    const ratings = await this.ratingsRepository.findByMovieId(movieId);
    return ratings;
  }
}
