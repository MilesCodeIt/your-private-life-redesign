import type { ApiRoute } from "@/api/types";

import { getDatabaseConnection } from "@/database";
import User from "@/database/models/User";
import jwt from "jsonwebtoken"

export interface UsersMeRequestBody {
  username: string;
  password: string;
  signup_email: string;
}

export type UsersMeResponseBody = undefined;

/** GET `/api/users/me` */
export const get: ApiRoute<
  UsersMeRequestBody,
  UsersMeResponseBody
> = async (req, res) => {
  // 
}
