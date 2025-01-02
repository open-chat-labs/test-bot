const fs = require("fs");
const mime = require("mime-types");
const { placeholderResponse, placeholderMessage } = require("./placeholder");

async function processFile(filePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    const uint8Array = new Uint8Array(buffer);
    const mimeType = mime.lookup(filePath) || "application/octet-stream";
    const fileSize = buffer.length;
    console.log(`File loaded successfully:`);
    console.log(`  MIME Type: ${mimeType}`);
    console.log(`  Size: ${(fileSize / 1024).toFixed(2)} KB`);

    return { uint8Array, mimeType, fileSize };
  } catch (err) {
    console.error("Error loading file:", err);
    throw err;
  }
}

module.exports = async (req, res) => {
  const client = req.botClient;
  const placeholder = "Uploading file ...";

  placeholderMessage(placeholder, client, req.originalJwt);

  res.status(200).json(placeholderResponse(placeholder, req.jwt));

  console.log(req.jwt.chat);

  const filePath = "./dummy.pdf";
  const { uint8Array, fileSize, mimeType } = await processFile(filePath);

  client.sendFileMessage(
    req.originalJwt,
    true,
    filePath,
    uint8Array,
    mimeType,
    fileSize,
    "This is a test file"
  );
};
