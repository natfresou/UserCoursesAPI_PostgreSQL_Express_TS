import { Request, Response } from "express";
import { SessionReturn } from "../interfaces";
import { sessionsServices } from "../services";

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const login: SessionReturn = await sessionsServices.create(req.body);
  return res.status(200).json(login);
};
export default { loginUser };
