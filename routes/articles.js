import express from "express";
import {
  getArticles,
  createArticle,
  saveArticle,
  removeArticle,
} from "../controllers/articles.js";
import { auth } from "../middleware/auth.js";
import { validateAuth } from "../middleware/validation.js";

const router = express.Router();

router.use(validateAuth);
router.use(auth);

router.get("/articles", getArticles);

router.post("/articles", createArticle);

router.put("/articles/:articleId", saveArticle);

router.delete("/articles/:articleId", removeArticle);

export default router;
