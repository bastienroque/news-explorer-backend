export const errorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Invalid data" });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).json({ message: "Ressource not found" });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Expired token" });
  }
  console.error(err);
  res.status(500).json({ message: "Server internal error" });
  return next();
};
