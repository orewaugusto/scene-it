import { PrismaClient, Rating } from "@prisma/client";
import { CreateRatingDTO } from "../dtos/create-rating.dto";
import { RatingsRepositoryInterface } from "./interfaces/ratings-repository.interface";

export class RatingsRepository implements RatingsRepositoryInterface {
  constructor(private prisma = new PrismaClient()) {}

  async create(ratingData: CreateRatingDTO): Promise<Rating> {
    const { rating, review } = ratingData;

    if (rating < 1 || rating > 5) {
      throw new Error("Rating must be between 1 and 5");
    }

    if (review.length > 500) {
      console.error("REVIEW:", review);
      throw new Error("Review must be less than 500 characters");
    }

    return await this.prisma.rating.create({
      data: ratingData,
    });
  }

  async findByMovieId(movieId: number): Promise<Rating[]> {
    return await this.prisma.rating.findMany({
      where: {
        movieId: movieId,
      },
    });
  }
}
