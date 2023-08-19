import { Router } from "express";
import { validateBody } from "../middlewares";
import { sessionCreate } from "../schemas";
import { sessionControllers } from "../controllers";

const sessionRouter: Router = Router();

sessionRouter.post(
  "",
  validateBody(sessionCreate),
  sessionControllers.loginUser
);

export default sessionRouter;
