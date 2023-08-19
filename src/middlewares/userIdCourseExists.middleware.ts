import { NextFunction, Request, Response } from "express";

import { client } from "../database";
import { AppError } from "../errors";
import { UserCoursesResult } from "../interfaces";

export const userIdCourseExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;

  const lookingQuery: string =
    'SELECT * FROM "userCourses" WHERE "userId" = $1;';

  const queryResult: UserCoursesResult = await client.query(lookingQuery, [id]);

  if (!queryResult.rowCount) {
    throw new AppError("No course found", 404);
  }

  return next();
};
