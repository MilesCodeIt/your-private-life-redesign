import * as routes from "@/api/routes";
import cookies from "cookie-parser";
import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookies());

// Routeurs
app.use("/api/auth", routes.auth);
app.use("/api/users", routes.users);

export const handler = app;
