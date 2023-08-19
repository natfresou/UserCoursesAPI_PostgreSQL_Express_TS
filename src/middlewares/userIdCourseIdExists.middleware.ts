import { NextFunction, Request, Response } from "express";

import { client } from "../database";
import { AppError } from "../errors";
import { UserCoursesResult } from "../interfaces";

export const userIdCourseIdExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId, userId } = req.params;

  const lookingQuery: string =
    'SELECT * FROM "userCourses" WHERE "courseId"=$1 AND "userId" = $2;';

  const queryResult: UserCoursesResult = await client.query(lookingQuery, [
    courseId,
    userId,
  ]);
  console.log(queryResult);
  if (queryResult.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }
  return next();
};
