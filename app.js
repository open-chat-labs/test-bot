const express = require("express");
const cors = require("cors");
const verifyJwt = require("./middleware/jwt");
const calculator = require("./handlers/calculator");

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// Route definitions
app.post("/execute/calculate", verifyJwt(JWT_SECRET), calculator);

module.exports = app;
