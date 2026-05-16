import express from "express";
import {
  validateCreateUser,
  validateUserId,
  validateAuth,
} from "../middleware/validation.js";
import {
  getCurrentUser,
  getUserById,
  signupUser,
  signinUser,
} from "../controllers/users.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", validateAuth, signinUser);

router.post("/signup", validateCreateUser, signupUser);

router.use(auth);

router.get("/me", getCurrentUser);

router.get("/:userId", validateUserId, getUserById);

export default router;
