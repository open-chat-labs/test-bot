const artist = require("./artist");
const album = require("./album");
const song = require("./song");
const image = require("./image");
const file = require("./file");

module.exports = (req, res) => {
  const { command_name, command_args } = req.jwt;

  console.log("Command: ", command_name);
  console.log("Parameters: ", command_args);

  // let's assume that the jwt has a commandName field
  switch (command_name) {
    case "file":
      return file(req, res);
    case "image":
      return image(req, res);
    case "song":
      return song(req, res);
    case "artist":
      return artist(req, res);
    case "album":
      return album(req, res);

    default:
      res.status(400).json({ success: false, message: "unknown command" });
  }
};
