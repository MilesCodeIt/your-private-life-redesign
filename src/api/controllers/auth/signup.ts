import type { ApiRoute } from "@/api/types";

import { getDatabaseConnection } from "@/database";
import User from "@/database/models/User";

import bcrypt from "bcryptjs";
import got, { HTTPError } from "got-cjs";

export interface SignUpRequestBody {
  captcha: string;
  username: string;
  password: string;
  email: string;
}

export interface SignUpResponseBody {
  /** L'ID de l'utilisateur crée. */
  id: string;
};

/** POST `/api/auth/signup` */
export const post: ApiRoute<
  SignUpRequestBody,
  SignUpResponseBody
> = async (req, res) => {
  const { password, username, captcha, email } = req.body;

  // On vérifie les champs de textes.
  if (!password || !username || !email) {
    res.status(400).json({
      success: false,
      message: "Un champ est manquant."
    });

    return;
  }

  // On vérifie si l'utilisateur a validé le captcha.
  if (!captcha) {
    res.status(400).json({
      success: false,
      message: "Vous n'avez pas valider le captcha."
    });

    return;
  }

  try {
    // On récupère les données du captcha.
    const captcha_response = await got.post(
      "https://hcaptcha.com/siteverify",
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
        },
        body: `response=${captcha}&secret=${process.env.HCAPTCHA_SECRET_KEY}`
      }
    ).json<{ success: boolean }>();
  
    // On vérifie si le captcha est correct. 
    if (!captcha_response.success) {
      res.status(400).json({
        success: false,
        message: "Le captcha est incorrect."
      });
  
      return;
    }
  }
  catch (error) {
    if (error instanceof HTTPError) {
      res.status(400).json({
        success: false,
        message: "Le captcha est incorrect."
      });
  
      return;  
    }

    res.status(500).json({
      success: false,
      message: "Une erreur est survenue lors de la vérification du captcha."
    });

    return;
  }


  // Connexion à la base de données.
  await getDatabaseConnection();

  // On vérifie si l'utilisateur existe déjà.
  const existUser = await User.findOne({
    $or: [
      { username: { $regex: new RegExp(username, "i") } },
      { email: { $regex: new RegExp(email, "i") } }
    ]
  });

  if (existUser) {
    res.status(401).json({
      success: false,
      message: "Ce nom d'utilisateur ou cette adresse e-mail est déjà utilisé."
    });

    return;
  }

  // On définit le niveau d'introduction à "non terminé" par défaut.
  const levels = new Map<string, boolean>();
  levels.set("introduction", false);

  // On hash le mot de passe de l'utilisateur.
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdUser = await User.create({
    username,
    password: hashedPassword,
    levels
  });

  res.status(200).json({
    success: true,
    data: {
      id: createdUser._id
    }
  });
}
