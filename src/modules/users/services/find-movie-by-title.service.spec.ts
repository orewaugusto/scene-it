// create-movie.service.spec.ts
import { MoviesRepositoryMock } from "../repositories/movies.repository.mock";
import { MoviesRepositoryInterface } from "../repositories/interfaces/movies-repository.interface";
import { CreateMovieServiceInterface } from "./create-movie.service.interface";
import { CreateMovieService } from "./create-movie.service";

describe("CreateMovieService", () => {
  let moviesRepository: MoviesRepositoryInterface;
  let createMovieService: CreateMovieServiceInterface;

  beforeEach(() => {
    moviesRepository = new MoviesRepositoryMock();
    createMovieService = new CreateMovieService(moviesRepository);
  });

  it("Should be able to create a new movie", async () => {
    const newMovie = await createMovieService.execute({
      title: "Inception",
      description: "A mind-bending thriller",
      releaseYear: 2010,
      posterUrl: "https://example.com/poster.jpg",
    });

    expect(newMovie).toHaveProperty("id");
    expect(newMovie.title).toBe("Inception");
  });

  it("Should not be able to create a movie with the same title and release year", async () => {
    await createMovieService.execute({
      title: "Inception",
      description: "A mind-bending thriller",
      releaseYear: 2010,
      posterUrl: "https://example.com/poster.jpg",
    });

    await expect(
      createMovieService.execute({
        title: "Inception",
        description: "Duplicate entry",
        releaseYear: 2010,
        posterUrl: "https://example.com/duplicate.jpg",
      })
    ).rejects.toThrow(
      "Filme já cadastrado com esse título e ano de lançamento."
    );
  });
});
