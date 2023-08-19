import { QueryResult } from "pg";
import {
  courseCreateSchema,
  courseSchema,
  courseUpdateSchema,
} from "../schemas";

type Course = Zod.infer<typeof courseSchema>;

type CourseResult = QueryResult<Course>;
type CourseCreate = Zod.infer<typeof courseCreateSchema>;
type CourseRead = Array<Course>;
type CourseUpdate = Zod.infer<typeof courseUpdateSchema>;

export { Course, CourseResult, CourseCreate, CourseRead, CourseUpdate };
