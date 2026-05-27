import mongoose from "mongoose";
import { Schema } from "mongoose";

const urlRegex = /^https?:\/\/(www\.)?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]+#?$/;

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: Date,
  source: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: function (url) {
        return urlRegex.test(url);
      },
      message: "URL invalid",
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (url) {
        return urlRegex.test(url);
      },
      message: "Invalid Image URL",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    select: false,
  },
});

const Article = mongoose.model("article", articleSchema);

export default Article;
