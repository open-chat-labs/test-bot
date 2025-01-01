const express = require("express");
const cors = require("cors");
const verifyJwt = require("./middleware/jwt");
const executeCommand = require("./handlers/executeCommand");
const schema = require("./handlers/schema");
const createBotClient = require("./middleware/botclient");
const { Secp256k1KeyIdentity } = require("@dfinity/identity-secp256k1");

const app = express();
const OC_PUBLIC = process.env.OC_PUBLIC;
const IDENTITY_PRIVATE = process.env.IDENTITY_PRIVATE;
const IC_HOST = process.env.IC_HOST;
const STORAGE_INDEX_CANISTER = process.env.STORAGE_INDEX_CANISTER;

function createIdentity(privateKey) {
  const privateKeyPem = privateKey.replace(/\\n/g, "\n");
  try {
    const id = Secp256k1KeyIdentity.fromPem(privateKeyPem);
    return id.getPrincipal().toText();
  } catch (err) {
    console.error("Unable to create identity from private key", err);
    throw err;
  }
}

console.log(createIdentity(IDENTITY_PRIVATE));

app.use(cors());
app.use(express.text());
app.post(
  "/execute_command",
  verifyJwt(OC_PUBLIC),
  createBotClient(IDENTITY_PRIVATE, IC_HOST, STORAGE_INDEX_CANISTER),
  executeCommand
);
app.get("/", schema);

module.exports = app;
