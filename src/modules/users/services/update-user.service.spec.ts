import { UserRepositoryMock } from "../repositories/users.repository.mock";
import { UpdateUserService } from "./update-user.service";

describe("updateUserService", () => {
  let userRepository: UserRepositoryMock;
  let updateUserService: UpdateUserService;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    updateUserService = new UpdateUserService(userRepository);
  });

  it("should be able to update an existent user's bio", async () => {
    const user = await userRepository.createUser({
      email: `johndoe@gmail.com`,
      password: "teste123456",
      username: `John Doe`,
    });

    await updateUserService.execute(user.id, {
      bio: "updated bio",
    });

    expect(userRepository.db).toHaveLength(1);
    expect(userRepository.db[0].bio).toEqual("updated bio");
    expect(userRepository.db[0].avatarUrl).toEqual("");
  });

  it("should be able to update an existent user's avatarUrl", async () => {
    const user = await userRepository.createUser({
      email: `janedoe@gmail.com`,
      password: "teste123456",
      username: `Jane Doe`,
    });

    const newAvatarUrl = "http://example.com/new-avatar.jpg";
    await updateUserService.execute(user.id, {
      avatarUrl: newAvatarUrl,
    });

    expect(userRepository.db).toHaveLength(1);
    expect(userRepository.db[0].avatarUrl).toEqual(newAvatarUrl);
    expect(userRepository.db[0].bio).toEqual("");
  });

  it("should be able to update both bio and avatarUrl", async () => {
    const user = await userRepository.createUser({
      email: `test@gmail.com`,
      password: "password123",
      username: `Test User`,
    });

    const updatedBio = "New bio text";
    const updatedAvatar = "http://another.com/avatar.png";
    await updateUserService.execute(user.id, {
      bio: updatedBio,
      avatarUrl: updatedAvatar,
    });

    expect(userRepository.db).toHaveLength(1);
    expect(userRepository.db[0].bio).toEqual(updatedBio);
    expect(userRepository.db[0].avatarUrl).toEqual(updatedAvatar);
  });

  it("shoud not be able to update an inexistent user", async () => {
    await userRepository.createUser({
      email: `johndoe@gmail.com`,
      password: "teste123456",
      username: `John Doe`,
    });

    await expect(
      updateUserService.execute(2, { bio: "some bio" }),
    ).rejects.toThrow("user not found");

    await expect(
      updateUserService.execute(2, { avatarUrl: "http://invalid.url" }),
    ).rejects.toThrow("user not found");
  });
});
