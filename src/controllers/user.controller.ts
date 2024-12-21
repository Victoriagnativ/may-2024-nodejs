import { NextFunction, Request, Response } from "express";

import { IUserDto } from "../intefaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserDto;
      const result = await userService.create(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async getUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const user = await userService.getUserId(userId);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async createUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      const dto = req.body as any;
      const user = await userService.createUserId(userId, dto);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
  public async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = Number(req.params.userId);
      await userService.deleteUser(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
