import { QueryResult } from "pg";
import {
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas";
import { z } from "zod";

type User = Zod.infer<typeof userSchema>;

type UserCreate = z.infer<typeof userCreateSchema>;
type UserRead = z.infer<typeof userReadSchema>;
type UserUpdate = z.infer<typeof userUpdateSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;

type UserResult = QueryResult<User>;

export { User, UserResult, UserRead, UserUpdate, UserCreate, UserReturn };
