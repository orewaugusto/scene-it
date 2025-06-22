import { Rating } from "@prisma/client";

export interface FindRatingsByMovieIdServiceInterface {
  execute(movieId: number): Promise<Rating[]>;
}
