import { UserRepositoryInterface } from "../repositories/interfaces/user-repository.interface";
import { UserRepositoryMock } from "../repositories/users.repository.mock";
import { CreateUserService } from "./create-user.service";
import { CreateUserServiceInterface } from "./interfaces/create-user-service.interface";
import { LoginUserServiceInterface } from "./interfaces/login-user.service.interface";
import { LoginUserService } from "./login-user.service";

describe("loginUserService", () => {
  let userRepository: UserRepositoryInterface;
  let loginUserService: LoginUserServiceInterface;
  let createUserService: CreateUserServiceInterface;

  beforeEach(async () => {
    userRepository = new UserRepositoryMock();
    createUserService = new CreateUserService(userRepository);
    loginUserService = new LoginUserService(userRepository, "Lana");
    process.env.TOKEN_SECRET = "0101"
    let newUser = await createUserService.execute({
      email: "johndoe@gmail.com",
      password: "teste123456",
      username: "John Doe",
    });
  });

  it("should be able to login with a valid email and password", async () => {
    const authenticationToken = await loginUserService.execute(
      "johndoe@gmail.com",
      "teste123456"
    );

    expect(authenticationToken).toBeDefined();
  });

  it("Should not be able to login with an incorrect password", async () => {
    expect(async () => {
      const authenticationToken = await loginUserService.execute(
        "johndoe@gmail.com",
        "teste654321"
      );
    }).rejects.toThrow("Password is incorrect");
  });

  it("Should not be able to login with an invalid email", async () => {
    expect(async () => {
      const authenticationToken = await loginUserService.execute(
        "notjohndoe@gmail.com",
        "teste123456"
      );
    }).rejects.toThrow("No user with this email");
  })
});
