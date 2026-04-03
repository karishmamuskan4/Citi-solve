import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token;
    //checking if token exist
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    req.user = decoded; // attach user data to request

    next();
  } catch {
    return res.status(401).json({ message: "Token failed" });
  }
};
