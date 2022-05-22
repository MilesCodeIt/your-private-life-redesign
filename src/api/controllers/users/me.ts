import type { ApiRoute } from "@/api/types";

import { getDatabaseConnection } from "@/database";
import User from "@/database/models/User";
import jwt from "jsonwebtoken"

export type UsersMeRequestBody = undefined; 
export type UsersMeResponseBody = undefined;

/** GET `/api/users/me` */
export const get: ApiRoute<
  UsersMeRequestBody,
  UsersMeResponseBody
> = async (req, res) => {
  const user_token = req.cookies.token as string | undefined;
  if (!user_token) {
    res.status(403).json({
      success: false,
      message: "Vous n'êtes pas connecté à votre compte."
    });

    return;
  }

  res.status(200).json({
    success: true,
    data: undefined
  });
}
