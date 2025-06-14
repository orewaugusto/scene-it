import { PrismaClient, Rating } from "@prisma/client";
import { CreateRatingDTO } from "../dtos/create-rating.dto";
import { RatingsRepositoryInterface } from "./interfaces/ratings-repository.interface";

export class RatingsRepository implements RatingsRepositoryInterface {
  constructor(private prisma = new PrismaClient()) {}

  async create(ratingData: CreateRatingDTO): Promise<Rating> {
    return await this.prisma.rating.create({
      data: ratingData,
    });
  }
}
