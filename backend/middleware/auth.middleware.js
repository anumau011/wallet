import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
