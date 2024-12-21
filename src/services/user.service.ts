import { ApiError } from "../errors/api-error";
import { IUser } from "../intefaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }
  public async create(dto: any): Promise<IUser> {
    if (!dto.name || dto.name.length < 4) {
      throw new ApiError(
        "Name is required and should be minimum 3 symbols",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required", 400);
    }
    if (!dto.password || dto.password.length < 8) {
      throw new ApiError(
        "Password is required and should be minimum 8 symbols",
        400,
      );
    }
    return await userRepository.create(dto);
  }
  public async getUserId(userId: number): Promise<IUser> {
    const user = await userRepository.getUserId(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
  public async createUserId(userId: number, dto: any): Promise<IUser> {
    if (!dto.name || dto.name.length < 4) {
      throw new ApiError(
        "Name is required and should be minimum 3 symbols",
        400,
      );
    }
    if (!dto.email || !dto.email.includes("@")) {
      throw new ApiError("Email is required", 400);
    }
    if (!dto.password || dto.password.length < 8) {
      throw new ApiError(
        "Password is required and should be minimum 8 symbols",
        400,
      );
    }
    const user = await userRepository.getUserId(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await userRepository.createUserId(userId, dto);
  }
  public async deleteUser(userId: number): Promise<void> {
    const user = await userRepository.getUserId(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.deleteUser(userId);
  }
}
export const userService = new UserService();
