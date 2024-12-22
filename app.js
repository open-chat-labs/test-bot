const express = require("express");
const cors = require("cors");
const verifyJwt = require("./middleware/jwt");
const executeCommand = require("./handlers/executeCommand");
const schema = require("./handlers/schema");
const createBotClient = require("./middleware/botclient");

const app = express();
const OC_PUBLIC = process.env.OC_PUBLIC;
const IDENTITY_PRIVATE = process.env.IDENTITY_PRIVATE;
const IC_HOST = process.env.IC_HOST;

app.use(cors());
app.use(express.text());
app.post(
  "/execute_command",
  verifyJwt(OC_PUBLIC),
  createBotClient(IDENTITY_PRIVATE, IC_HOST),
  executeCommand
);
app.get("/", schema);

module.exports = app;
