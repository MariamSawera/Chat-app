import express from "express";
// import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersForSidebar } from "../controllers/message.controller.js";

const router = express.Router();

// router.post("/signup", signup );

// router.post("/login", login);

// router.post("/logout", logout);

router.get("/users", protectRoute ,getUsersForSidebar);

// router.get("/check", protectRoute ,checkAuth); //if user auth or not



export default router;