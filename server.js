import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { errors } from "celebrate";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger, errorLogger } from "./middleware/logger.js";

import usersRoutes from "./routes/users.js";
import articlesRoutes from "./routes/articles.js";

dotenv.config();

const PORT = process.env.PORT || 3005;

const app = express();

app.use(cors());

app.use(express.json());
app.use(errors());

app.use((req, next) => {
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

app.use(errorLogger);

app.use(errorHandler);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server running on Port:", PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
