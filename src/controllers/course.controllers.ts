import { Request, Response } from "express";
import { Course, UserCourses } from "../interfaces";
import { courseServices } from "../services";

const createCourse = async (req: Request, res: Response): Promise<Response> => {
  const newCourse: Course = await courseServices.create(req.body);
  return res.status(201).json(newCourse);
};
const readAllCourses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const allcourses: Array<Course> = await courseServices.read();
  return res.status(200).json(allcourses);
};

const readIdUsersInsideOnCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const readIdDates: Array<UserCourses> = await courseServices.readId(
    req.params.id
  );
  return res.status(200).json(readIdDates);
};

const includsUserOnCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await courseServices.postUserOnCourse(req.params.userId, req.params.courseId);
  return res.status(201).json({
    message: "User successfully vinculed to course",
  });
};

const deleteUserOnCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  await courseServices.updateUserOnCourse(
    req.params.userId,
    req.params.courseId
  );
  return res.status(204).json();
};

export default {
  createCourse,
  readAllCourses,
  readIdUsersInsideOnCourse,
  includsUserOnCourse,
  deleteUserOnCourse,
};
