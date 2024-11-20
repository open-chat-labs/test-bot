const express = require("express");
const cors = require("cors");
const verifyJwt = require("./middleware/jwt");
const calculator = require("./handlers/calculator");
const ban = require("./handlers/ban");
const weather = require("./handlers/weather");
const multiply = require("./handlers/multiply");

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// Route definitions
app.post("/execute/calculate", verifyJwt(JWT_SECRET), calculator);
app.post("/execute/ban", verifyJwt(JWT_SECRET), ban);
app.post("/execute/weather", verifyJwt(JWT_SECRET), weather);
app.post("/execute/multiply", verifyJwt(JWT_SECRET), multiply);

module.exports = app;
