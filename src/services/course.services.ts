import format from "pg-format";
import {
  Course,
  CourseResult,
  CourseCreate,
  CourseRead,
  CourseUpdate,
  UserCoursesCreate,
  UserCoursesResult,
} from "../interfaces";
import { client } from "../database";

const create = async (payLoad: CourseCreate): Promise<Course> => {
  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payLoad),
    Object.values(payLoad)
  );
  const queryResult: CourseResult = await client.query(queryFormat);
  return queryResult.rows[0];
};

const read = async (): Promise<CourseRead> => {
  const queryResult: CourseResult = await client.query(
    'SELECT * FROM "courses";'
  );
  return queryResult.rows;
};

const readId = async (id: string): Promise<Array<UserCoursesCreate>> => {
  const query: string = `SELECT
  "u"."id" AS "userId",
  "u"."name" AS "userName",
  "co"."id" AS "courseId",
  "co"."name" AS "courseName",
  "co"."description" AS "courseDescription",
  "uc"."active" AS "userActiveInCourse"
  FROM 
  "users" AS "u"
  JOIN "userCourses" AS "uc"
  ON "uc"."userId"="u"."id"
  JOIN "courses" AS "co"
  ON "co"."id"="uc"."courseId"
  WHERE "co"."id"=$1;
  `;
  const queryResult: UserCoursesResult = await client.query(query, [id]);
  return queryResult.rows;
};

const postUserOnCourse = async (
  userId: string,
  courseId: string
): Promise<void> => {
  const query: string =
    'INSERT INTO "userCourses" ("userId","courseId") VALUES ($1,$2);';
  await client.query(query, [userId, courseId]);
};

const updateUserOnCourse = async (
  userId: string,
  courseId: string
): Promise<void> => {
  const query: string = `UPDATE "userCourses" SET "active"=false WHERE "userId" = $1 AND  "courseId" = $2;`;
  await client.query(query, [userId, courseId]);
};

export default { create, read, readId, postUserOnCourse, updateUserOnCourse };
