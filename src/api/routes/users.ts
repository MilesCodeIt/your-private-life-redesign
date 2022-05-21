import * as controllers from "@/api/controllers/users";

import express from "express";
const router = express.Router();

router.get("/me", controllers.me.get);

export const users = router;
