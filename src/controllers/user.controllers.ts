import { Request, Response } from "express";
import {
  User,
  UserCourses,
  UserCreate,
  UserRead,
  UserReturn,
} from "../interfaces";
import { userServices } from "../services";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const newUser: UserReturn = await userServices.create(req.body);
  return res.status(201).json(newUser);
};
const readAllUsers = async (req: Request, res: Response): Promise<Response> => {
  const allUsers: UserRead = await userServices.read();
  return res.status(200).json(allUsers);
};

const readIdUserAndCousers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const readIdDates: Array<UserCourses> = await userServices.readId(
    req.params.id
  );
  return res.status(200).json(readIdDates);
};

export default {
  createUser,
  readAllUsers,
  readIdUserAndCousers,
};
