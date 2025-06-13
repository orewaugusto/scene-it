import { UserRepositoryMock } from "../repositories/users.repository.mock";
import { DeleteUserService } from "./delete-user.service";

describe("deleteUserService", () => {
  let userRepository: UserRepositoryMock;
  let deleteUserService: DeleteUserService;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    deleteUserService = new DeleteUserService(userRepository);
  });

  it("should be able to delete an existent user", async () => {
    for (let i = 0; i < 5; i++) {
      await userRepository.createUser({
        email: `johndoe${i}@gmail.com`,
        password: "teste123456",
        username: `John Doe${i}`
      })
    }

    await deleteUserService.execute(2);

    expect(userRepository.db).toHaveLength(4);
    expect(userRepository.db[1].id).toEqual(1);
  });

  it("shoud not be able to delete an inexistent user", async () => {
    await userRepository.createUser({
      email: "johndoe@gmail.com",
      password: "teste123456",
      username: "John Doe"
    })

    expect(async () => {
      await deleteUserService.execute(2);
    }).rejects.toThrow("user not found");
  })

})
