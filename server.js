import mongoose from "mongoose";
import dotenv from "dotenv";

import { app } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3005;

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
