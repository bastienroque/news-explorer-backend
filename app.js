import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errors } from "celebrate";

import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";

import usersRoutes from "./routes/users.js";
import articlesRoutes from "./routes/articles.js";

dotenv.config();

export const app = express();

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("The server will stop now");
  }, 0);
});

app.use("/users", usersRoutes);
app.use("/articles", articlesRoutes);

app.use(errors());
app.use(errorLogger);
app.use(errorHandler);
