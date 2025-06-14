import { CreateRatingService } from "./create-rating.service";
import { CreateRatingDTO } from "../dtos/create-rating.dto";
import { RatingsRepositoryMock } from "../repositories/ratings.repository.mock";

describe("CreateRatingService", () => {
  let service: CreateRatingService;

  beforeEach(() => {
    const repository = new RatingsRepositoryMock();
    service = new CreateRatingService(repository);
  });

  it("should create a rating with valid data", async () => {
    const data: CreateRatingDTO = {
      userId: 1,
      movieId: 100,
      rating: 9,
      review: "Amazing film!"
    };

    const result = await service.execute(data);

    expect(result).toHaveProperty("id");
    expect(result.userId).toBe(1);
    expect(result.movieId).toBe(100);
    expect(result.rating).toBe(9);
    expect(result.review).toBe("Amazing film!");
  });

  it("should assign a unique id to the new rating", async () => {
    const r1 = await service.execute({ userId: 1, movieId: 1, rating: 8, review: "Good" });
    const r2 = await service.execute({ userId: 2, movieId: 2, rating: 6, review: "Meh" });

    expect(r1.id).not.toBe(r2.id);
  });

  it("should allow creating multiple ratings", async () => {
    await service.execute({ userId: 1, movieId: 10, rating: 7, review: "Nice" });
    await service.execute({ userId: 2, movieId: 20, rating: 5, review: "Ok" });
    await service.execute({ userId: 3, movieId: 30, rating: 9, review: "Excellent" });

    const repository = (service as any).ratingsRepository as RatingsRepositoryMock;
    expect(repository.getAll().length).toBe(3);
  });

  it("should store and return createdAt and updatedAt timestamps", async () => {
    const result = await service.execute({
      userId: 4,
      movieId: 44,
      rating: 10,
      review: "Masterpiece"
    });

    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  it("should preserve the original rating data", async () => {
    const input: CreateRatingDTO = {
      userId: 7,
      movieId: 77,
      rating: 3,
      review: "Bad"
    };

    const result = await service.execute(input);

    expect(result.userId).toBe(input.userId);
    expect(result.movieId).toBe(input.movieId);
    expect(result.rating).toBe(input.rating);
    expect(result.review).toBe(input.review);
  });
});
