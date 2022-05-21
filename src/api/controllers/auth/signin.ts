import type { ApiRoute } from "@/api/types";

import { getDatabaseConnection } from "@/database";
import User from "@/database/models/User";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export interface SignInRequestBody {
  username: string;
  password: string;
}

export type SignInResponseBody = undefined;

/** POST `/api/auth/signin` */
export const post: ApiRoute<
  SignInRequestBody,
  SignInResponseBody
> = async (req, res) => {
  const body_username = req.body.username;
  const body_password = req.body.password;

  if (!body_username || !body_password) {
    res.status(400).json({
      success: false,
      message: "Le nom d'utilisateur ou mot de passe n'est pas défini."
    });

    return;
  }

  await getDatabaseConnection();
  const user = await User.findOne({
    username: { $regex: new RegExp(body_username, "i") }
  });

  // Vérfiication de l'existence de l'utilisateur.
  if (!user) {
    res.status(401).json({
      success: false,
      message: "Cet utilisateur n'existe pas."
    });
  
    return;
  }

  // Vérification du mot de passe.
  const verified = await bcrypt.compare(body_password, user.password);
  if (!verified) {
    res.status(401).json({
      success: false,
      message: "Le mot de passe est incorrect."
    });

    return;
  }

  // Payload que contiendra le token.
  const payload = {
    data: {
      id: user._id,
      username: user.username
    }
  };

  // Le token doit expirer après une semaine.
  const expiresIn = 60 * 60 * 24 * 7;

  // Vérification de la variable d'environnement pour générer le token.
  const JWT_SECRET = process.env.JWT_SECRET as string | undefined;
  if (!JWT_SECRET) {
    res.status(500).json({
      success: false,
      message: "Une erreur serveur est survenue, réessayez plus tard.",
      debug: {
        missing: "JWT_SECRET",
        in: "@/.env"
      }
    });
  
    return;
  }

  // Création du token.
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn
  });
  
  // Sauvegarde du token dans les cookies.
  res.cookie("token", token, {
    sameSite: "strict",
    maxAge: expiresIn,
    httpOnly: true,
    path: "/"
  })

  res.status(200).json({
    success: true,
    data: undefined
  });
}