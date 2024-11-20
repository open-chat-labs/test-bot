const jwt = require("jsonwebtoken");

const verifyJwt = (secret) => {
  return (req, res, next) => {
    const token = req.headers["x-auth-jwt"];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication token is missing." });
    }

    try {
      req.jwt = jwt.verify(token, secret);
      next();
    } catch (err) {
      console.error("Couldn't verify the jwt", err);
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token." });
    }
  };
};

module.exports = verifyJwt;
