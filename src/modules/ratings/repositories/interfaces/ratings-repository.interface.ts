import { Rating } from "@prisma/client";
import { CreateRatingDTO } from "../../dtos/create-rating.dto";

export interface RatingEntity {
  userId: number;
  movieId: number;
  rating: number;
  review: string;
}

export interface RatingsRepositoryInterface {
  create(ratingData: CreateRatingDTO): Promise<Rating>;
}
