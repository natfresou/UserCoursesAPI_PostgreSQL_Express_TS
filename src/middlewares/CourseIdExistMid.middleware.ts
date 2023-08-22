import { NextFunction, Request, Response } from "express";

import { client } from "../database";
import { AppError } from "../errors";
import { UserCoursesResult } from "../interfaces";

export const courseIdExistMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId } = req.params;

  const lookingQuery: string = 'SELECT * FROM "courses" WHERE "id"=$1';

  const queryResult: UserCoursesResult = await client.query(lookingQuery, [
    courseId,
  ]);
  if (!queryResult.rowCount) {
    throw new AppError("User/course not found", 404);
  }
  return next();
};
