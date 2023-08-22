import { Router } from "express";
import { courseControllers, userControllers } from "../controllers";
import { courseCreateSchema } from "../schemas";
import {
  courseIdExistMid,
  userIdExistMid,
  validateBody,
  verifyUserPermission,
} from "../middlewares";
import verifyToken from "../middlewares/verifyToken.middleware";

const coursesRouter: Router = Router();

coursesRouter.post(
  "",
  verifyToken,
  verifyUserPermission,
  validateBody(courseCreateSchema),
  courseControllers.createCourse
);
coursesRouter.get("", courseControllers.readAllCourses);

coursesRouter.post(
  "/:courseId/users/:userId",courseIdExistMid,userIdExistMid,
  verifyToken,
  verifyUserPermission,
  courseControllers.includsUserOnCourse
);
coursesRouter.delete(
  "/:courseId/users/:userId", courseIdExistMid,userIdExistMid,
  verifyToken,
  verifyUserPermission,
  courseControllers.deleteUserOnCourse
);
coursesRouter.get(
  "/:id/users", 
  verifyToken,
  verifyUserPermission,
  courseControllers.readIdUsersInsideOnCourse
);

export default coursesRouter