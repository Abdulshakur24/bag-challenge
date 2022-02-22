const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"]
    ? req.headers["authorization"].split(" ")[1]
    : null;

  if (!token) return res.status(401).send("Token required!");

  jwt.verify(token, process.env.JWT_KEY, (err) => {
    if (err) {
      return err.name === "TokenExpiredError"
        ? res.status(403).send("Your session has expired. Please log in again.")
        : res.status(403).send("Invalid Token.");
    }
    return next();
  });
};
