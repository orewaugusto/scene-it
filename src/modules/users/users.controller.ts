import { Request, Response } from "express";
import { CreateUserDTO } from "./dtos/create-user.dto";
import { CreateUserService } from "./services/create-user.service";
import { CreateUserServiceInterface } from "./services/interfaces/create-user-service.interface";
import { UserRepositoryInterface } from "./repositories/interfaces/user-repository.interface";
import { UserRepository } from "./repositories/users.repository";
import { LoginUserDTO } from "./dtos/login-user.dto";
import { LoginUserServiceInterface } from "./services/interfaces/login-user.service.interface";
import { LoginUserService } from "./services/login-user.service";
import { DeleteUserServiceInterface } from "./services/interfaces/delete-user-service.interface";
import { DeleteUserService } from "./services/delete-user.service";
import { UpdateUserServiceInterface } from "./services/interfaces/update-user.service.interface";
import { UpdateUserService } from "./services/update-user.service";
import { UpdateUserDTO } from "./dtos/update-user.dto";
import { AuthenticatedRequest } from "../../middlewares/auth.middleware";

export class UsersController {
  constructor(
    private userRepository: UserRepositoryInterface = new UserRepository(),
    private createUserService: CreateUserServiceInterface = new CreateUserService(
      userRepository,
    ),
    private loginUserService: LoginUserServiceInterface = new LoginUserService(
      userRepository,
      process.env.TOKEN_SECRET!,
    ),
    private deleteUserService: DeleteUserServiceInterface = new DeleteUserService(
      userRepository,
    ),
    private updateUserService: UpdateUserServiceInterface = new UpdateUserService(
      userRepository,
    ),
  ) {}

  async createUser(req: Request, res: Response) {
    try {
      const { email, username, password } = req.body as CreateUserDTO;

      const newUser = await this.createUserService.execute({
        email,
        username,
        password,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ error: (error as Error)?.message || "An error occurred." });
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body as LoginUserDTO;

      const authenticationToken = await this.loginUserService.execute(
        email,
        password,
      );

      res.status(201).json(authenticationToken);
    } catch (error: unknown) {
      res.status(400).json({
        error: (error as Error)?.message || "An error occurred during login.",
      });
      return;
    }
  }

  async updateUser(req: AuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { bio } = req.body as UpdateUserDTO;

      const _id = Number(id);
      if (isNaN(_id)) {
        res.status(400).json({ error: "invalid id" });
        return;
      }

      if (req.userId !== _id) {
        res.status(403).json({
          message: "Forbidden: You can only update your own profile.",
        });
        return;
      }

      await this.updateUserService.execute(_id, { bio });

      res.status(200).json({ message: "user updated successfully" });
      return;
    } catch (error) {
      res.status(400).json({ error: error });
      return;
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const _id = Number(id);

      if (isNaN(_id)) {
        res.status(400).json({ error: "invalid id" });
        return;
      }

      await this.deleteUserService.execute(_id);

      res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error });
      return;
    }
  }
}
