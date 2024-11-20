require("dotenv").config();
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;
const payload = {
  sub: "1234567890",
  name: "John Doe",
  role: "admin",
  iat: Math.floor(Date.now() / 1000),
};

// Generate a token
const token = jwt.sign(payload, secret, { expiresIn: "30d" });

console.log("Test JWT:", token);
