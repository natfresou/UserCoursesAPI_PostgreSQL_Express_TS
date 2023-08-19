import { Router } from "express";
import { userControllers } from "../controllers";
import {
  uniqueEmail,
  userIdCourseExist,
  validateBody,
  verifyUserPermission,
} from "../middlewares";
import { userCreateSchema } from "../schemas";
import verifyToken from "../middlewares/verifyToken.middleware";

const usersRouter: Router = Router();

usersRouter.post(
  "",
  validateBody(userCreateSchema),
  uniqueEmail,
  userControllers.createUser
);
usersRouter.get(
  "",
  verifyToken,
  verifyUserPermission,
  userControllers.readAllUsers
);
usersRouter.get(
  "/:id/courses",
  verifyToken,
  verifyUserPermission,
  userIdCourseExist,
  userControllers.readIdUserAndCousers
);

export default usersRouter;
