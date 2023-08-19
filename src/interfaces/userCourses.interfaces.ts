import { QueryResult } from "pg";

type UserCourses = {
  courseId: number;
  courseName: string;
  courseDescription: string;
  userActiveInCourse: boolean;
  userId: number;
  userName: string;
};

type UserCoursesResult = QueryResult<UserCourses>;
type UserCoursesCreate = Omit<UserCourses, "id">;
type UserCoursesRead = Array<UserCourses>;
type UserCoursesrUpdate = Partial<UserCoursesCreate>;

export {
  UserCourses,
  UserCoursesResult,
  UserCoursesCreate,
  UserCoursesRead,
  UserCoursesrUpdate,
};
