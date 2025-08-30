import express from "express";
import { checkAuth, loginUser, logoutUser, signUpUser, updateProfile } from "../controllers/userController.js";
import { protectedRoute } from "../middleware/protectedRoute.js";
const router = express.Router();

router.post("/signUp",signUpUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.put("/updateProfile",protectedRoute, updateProfile)
router.get("/check",protectedRoute,checkAuth);

export default router;