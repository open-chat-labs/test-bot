const express = require("express");
const cors = require("cors");
const verifyJwt = require("./middleware/jwt");
const executeCommand = require("./handlers/executeCommand");
const schema = require("./handlers/schema");
const { Secp256k1KeyIdentity } = require("@dfinity/identity-secp256k1");

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;
const PRIVATE_PEM = process.env.PRIVATE_PEM;

function createIdentity() {
  const privateKeyPem = PRIVATE_PEM.replace(/\\n/g, "\n");
  try {
    return Secp256k1KeyIdentity.fromPem(privateKeyPem);
  } catch (err) {
    console.error(err);
  }
}

const id = createIdentity();
console.log(
  "Principal: ",
  id.getPrincipal().toText(),
  id.getPrincipal().isAnonymous()
);

app.use(cors());
app.use(express.json());

app.post("/execute_command", verifyJwt(JWT_SECRET), executeCommand);
app.get("/", schema);

module.exports = app;
