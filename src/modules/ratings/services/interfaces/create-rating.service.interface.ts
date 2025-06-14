import { Rating } from "@prisma/client";
import { CreateRatingDTO } from "../../dtos/create-rating.dto";

export interface CreateRatingServiceInterface {
  execute(data: CreateRatingDTO): Promise<Rating>;
}
