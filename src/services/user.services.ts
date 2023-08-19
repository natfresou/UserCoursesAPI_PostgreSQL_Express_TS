import format from "pg-format";
import {
  User,
  UserResult,
  UserRead,
  UserUpdate,
  UserCreate,
  UserCoursesCreate,
  UserCoursesResult,
  UserCoursesRead,
  UserReturn,
} from "../interfaces";
import { client } from "../database";
import { parse } from "path";
import { userReadSchema, userReturnSchema } from "../schemas";
import { hash } from "bcryptjs";

const create = async (payLoad: UserCreate): Promise<UserReturn> => {
  payLoad.password = await hash(payLoad.password, 10);
  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payLoad),
    Object.values(payLoad)
  );
  const queryResult: UserResult = await client.query(queryFormat);
  const user = queryResult.rows[0];
  const userNoPassword = userReturnSchema.parse(user);
  return userNoPassword;
};

const read = async (): Promise<UserRead> => {
  const queryResult: UserResult = await client.query('SELECT * FROM "users";');
  return userReadSchema.parse(queryResult.rows);
};

const readId = async (userId: string): Promise<Array<UserCoursesCreate>> => {
  const query: string = `SELECT 
  "co"."id" AS "courseId",
  "co"."name" AS "courseName",
  "co"."description" AS "courseDescription",
  "uc"."active" AS "userActiveInCourse",
  "u"."id" AS "userId",
  "u"."name" AS "userName"
   FROM "users" AS "u" 
  JOIN "userCourses" AS "uc"
  ON "uc"."userId" = "u"."id"
  JOIN "courses" AS "co"
  ON "uc"."courseId"="co".id
  WHERE "u"."id"=$1;`;
  const queryResult: UserCoursesResult = await client.query(query, [userId]);
  return queryResult.rows;
};

export default { create, read, readId };
