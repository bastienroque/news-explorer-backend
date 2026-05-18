import User from "../models/user.js";
import jsonwebtoken from "jsonwebtoken";

const jwt = jsonwebtoken;

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Signin user
export const signinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signin(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup user
export const signupUser = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.signup(email, password, username);

    const token = createToken(user._id);

    res.status(201).json({ email, token, username });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /users/me - returns current user
export const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

// GET /users/:userId - returns specific user
export const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch(next);
};
