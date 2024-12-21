import { read, write } from "../fs.service";
import { IUser } from "../intefaces/user.interface";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await read();
  }
  public async create(dto: any): Promise<IUser> {
    const users = await read();
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    users.push(newUser);
    await write(users);
    return newUser;
  }
  public async getUserId(userId: number): Promise<IUser> {
    const users = await read();
    const user = users.find((user) => user.id === userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    return user;
  }
  public async createUserId(userId: number, dto: any): Promise<IUser> {
    const users = await read();
    const index = users.findIndex((user) => user.id === userId);
    users[index] = {
      ...users[index],
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
    await write(users);
    return users[index];
  }
  public async deleteUser(userId: number): Promise<void> {
    const users = await read();
    const index = users.findIndex((user) => user.id === Number(userId));
    users.splice(index, 1);
    await write(users);
  }
}
export const userRepository = new UserRepository();
