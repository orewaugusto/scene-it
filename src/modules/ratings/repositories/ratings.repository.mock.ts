import { RatingsRepositoryInterface } from "./interfaces/ratings-repository.interface";
import { CreateRatingDTO } from "../dtos/create-rating.dto";
import { Rating } from "@prisma/client";

export class RatingsRepositoryMock implements RatingsRepositoryInterface {
  private ratings: Rating[] = [];
  private currentId = 1;

  async create({
    userId,
    movieId,
    rating,
    review,
  }: CreateRatingDTO): Promise<Rating> {
    const newRating: Rating = {
      id: this.currentId++,
      userId,
      movieId,
      rating,
      review,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.ratings.push(newRating);
    return newRating;
  }

  async findByMovieId(movieId: number): Promise<Rating[]> {
    return this.ratings.filter((rating) => rating.movieId === movieId);
  }

  // Método auxiliar para testes (opcional)
  getAll(): Rating[] {
    return this.ratings;
  }
}
