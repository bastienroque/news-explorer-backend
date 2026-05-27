export const errorHandler = (err, req, res, next) => {
  if (err.isJoi || (err.name === "ValidationError" && err.details)) {
    return res
      .status(400)
      .json({ message: err.details?.[0]?.message || "Invalid data" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: "Invalid data" });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
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
  return res.status(500).json({ message: "Server internal error" });
};
