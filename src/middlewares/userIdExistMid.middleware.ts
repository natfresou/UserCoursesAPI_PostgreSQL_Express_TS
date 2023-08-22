import { NextFunction, Request, Response } from "express";

import { client } from "../database";
import { AppError } from "../errors";
import { UserCoursesResult } from "../interfaces";

export const userIdExistMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  const lookingQuery: string = 'SELECT * FROM "users" WHERE "id"=$1';

  const queryResult: UserCoursesResult = await client.query(lookingQuery, [
    userId,
  ]);
  if (!queryResult.rowCount) {
    throw new AppError("User/course not found", 404);
  }
  return next();
};
