const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(404).json({ message: "Please Provide a token" });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken.id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = protect;
