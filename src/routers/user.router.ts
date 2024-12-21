import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();
router.get("/", userController.getList);
router.post("/", userController.create);
router.get("/:userId", userController.getUserId);
router.put("/:userId", userController.createUserId);
router.delete("/:userId", userController.deleteUser);

export const userRouter = router;
