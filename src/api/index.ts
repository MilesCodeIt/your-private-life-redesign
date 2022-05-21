import * as routes from "@/api/routes";
import express from "express";
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routeurs
app.use("/api/auth", routes.auth);
app.use("/api/users", routes.users);

export const handler = app;
