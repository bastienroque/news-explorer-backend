import jsonwebtoken from "jsonwebtoken";
import User from "../models/user.js";

const jwt = jsonwebtoken;

export const auth = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      error: "Authorization token required",
    });
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      error: "Invalid authorization format",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload._id);

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Request is not authorized",
    });
  }
};
