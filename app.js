const express = require("express");
const cors = require("cors");
const verifyJwt = require("./middleware/jwt");
const executeCommand = require("./handlers/executeCommand");
const schema = require("./handlers/schema");

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

app.post("/execute_command", verifyJwt(JWT_SECRET), executeCommand);
app.get("/", schema);

module.exports = app;
