import { UserRepositoryInterface } from "../repositories/interfaces/user-repository.interface";
import { UserRepositoryMock } from "../repositories/users.repository.mock";
import { CreateUserService } from "./create-user.service";
import { CreateUserServiceInterface } from "./interfaces/create-user-service.interface";

describe("createUserService", () => {
  let userRepository: UserRepositoryInterface;
  let createUserService: CreateUserServiceInterface;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    createUserService = new CreateUserService(userRepository);
  });

  it("Should be able to create a new user", async () => {
    const newUser = await createUserService.execute({
      email: "johndoe@gmail.com",
      password: "teste123456",
      username: "John Doe",
    });

    expect(newUser).toHaveProperty("id");
    expect(newUser.email).toEqual("johndoe@gmail.com");
  });

  it("Should not be able to create a new user with an already registered email", async () => {
    await createUserService.execute({
      email: "johndoe@gmail.com",
      password: "teste123456",
      username: "John Doe",
    });

    await expect(
      createUserService.execute({
        email: "johndoe@gmail.com",
        password: "teste123456",
        username: "John Doe",
      }),
    ).rejects.toThrow("Email já cadastrado.");
  });

  it("Should correctly save the provided username", async () => {
    const userData = {
      email: "janedoe@example.com",
      password: "securePass123",
      username: "JaneDoe",
    };

    const createdUser = await createUserService.execute(userData);

    expect(createdUser.username).toBe("JaneDoe");
  });
});
