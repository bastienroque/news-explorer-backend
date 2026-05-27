import User from "../models/user.js";
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.signin(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token, username: user.username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const signupUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await User.signup(email, password, username);

    const token = createToken(user._id);

    res.status(201).json({ email, token, username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.send({ email: user.email, username: user.username });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId).orFail();
    res.send({ email: user.email, username: user.username });
  } catch (err) {
    next(err);
  }
};
