const fs = require("fs");
const sharp = require("sharp");
const { placeholderResponse, placeholderMessage } = require("./placeholder");

const MAX_SIZE_BYTES = 0.5 * 1024 * 1024;

async function processImage(filePath) {
  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();
    let buffer = await image.toBuffer();
    let width = metadata.width;
    let height = metadata.height;

    while (buffer.length > MAX_SIZE_BYTES) {
      const scaleFactor = Math.sqrt(MAX_SIZE_BYTES / buffer.length);
      width = Math.round(width * scaleFactor);
      height = Math.round(height * scaleFactor);
      buffer = await image.resize({ width, height }).toBuffer();
    }

    console.log(`Final Dimensions: ${width}x${height}`);
    console.log(`Final Size: ${(buffer.length / 1024).toFixed(2)} KB`);
    const uint8Array = new Uint8Array(buffer);
    return {
      uint8Array,
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
    };
  } catch (err) {
    console.error("Error processing image:", err);
    throw err;
  }
}

module.exports = async (req, res) => {
  const client = req.botClient;
  const placeholder = "Uploading image ...";

  placeholderMessage(placeholder, client, req.originalJwt);

  res.status(200).json(placeholderResponse(placeholder, req.jwt));

  console.log(req.jwt.chat);

  const filePath = "./picture.png";
  const { uint8Array, width, height, format } = await processImage(filePath);

  client.sendImageMessage(
    req.originalJwt,
    true,
    uint8Array,
    `image/${format}`,
    width,
    height,
    "This is a test image"
  );
};
