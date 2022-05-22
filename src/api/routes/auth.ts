import * as controllers from "@/api/controllers/auth";

import express from "express";
const router = express.Router();

router.post("/signin",         controllers.signin.post);
router.post("/signup",         controllers.signup.post);
router.post("/check_username", controllers.check_username.post)

export const auth = router;
