const jwt = require("jsonwebtoken");
const TOKEN_KEY = process.env.TOKEN_KEY;

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });

  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Invalid token.");
  }
};
