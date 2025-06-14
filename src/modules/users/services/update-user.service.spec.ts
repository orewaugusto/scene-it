import { UserRepositoryMock } from "../repositories/users.repository.mock";
import { UpdateUserService } from "./update-user.service";

describe("updateUserService", () => {
  let userRepository: UserRepositoryMock;
  let updateUserService: UpdateUserService

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    updateUserService = new UpdateUserService(userRepository);
  });

  it("should be able to update an existent user", async () => {

    const user = await userRepository.createUser({
      email: `johndoe@gmail.com`,
      password: "teste123456",
      username: `John Doe`
    })


    await updateUserService.execute(user.id, {
      bio: "updated bio"
    })

    expect(userRepository.db).toHaveLength(1);
    expect(userRepository.db[0].bio).toEqual("updated bio")
  });

  it("shoud not be able to update an inexistent user", async () => {
    await userRepository.createUser({
      email: `johndoe@gmail.com`,
      password: "teste123456",
      username: `John Doe`
    })

    expect(async () => {
      await updateUserService.execute(2, { bio: "" })
    }).rejects.toThrow("user not found")
  })
})
