import express from "express";
import {
  getArticles,
  createArticle,
  removeArticle,
} from "../controllers/articles.js";
import { auth } from "../middleware/auth.js";
import { validateArticleId } from "../middleware/validation.js";

const router = express.Router();

router.use(auth);

router.get("/", getArticles);

router.post("/", createArticle);

router.delete("/:articleId", validateArticleId, removeArticle);

export default router;
