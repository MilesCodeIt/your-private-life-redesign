import type { ApiRoute } from "@/api/types";

import { getDatabaseConnection } from "@/database";
import User from "@/database/models/User";

export interface AuthCheckUsernameRequestBody {
  username: string;
}

export type AuthCheckUsernameResponseBody = {
  /** Valeur booléene disant si ce nom d'utilisateur existe ou non. */
  exists: boolean;
};

/** POST `/api/auth/check_username` */
export const post: ApiRoute<
  AuthCheckUsernameRequestBody,
  AuthCheckUsernameResponseBody
> = async (req, res) => {
  const body_username = req.body.username;
  if (!body_username) {
    res.status(400).json({
      success: false,
      message: "Le nom d'utilisateur est manquant."
    });

    return;
  }

  await getDatabaseConnection();
  const userExists = await User.findOne({
    username: { $regex: new RegExp(body_username, "i") }
  });

  if (!userExists) {
    res.status(200).json({
      success: true,
      data: {
        exists: false
      }
    });

    return;
  }

  res.status(200).json({
    success: true,
    data: {
      exists: true
    }
  });
};