const calculator = require("./calculator");
const ban = require("./ban");
const weather = require("./weather");
const multiply = require("./multiply");
const chat = require("./chat");

module.exports = (req, res) => {
  const { command_name, command_args } = req.jwt;

  console.log("Command: ", command_name);
  console.log("Parameters: ", command_args);

  // let's assume that the jwt has a commandName field
  switch (command_name) {
    case "calculate":
      return calculator(req, res);
    case "ban":
      return ban(req, res);
    case "weather":
      return weather(req, res);
    case "multiply":
      return multiply(req, res);
    case "chat":
      return chat(req, res);

    default:
      res.status(400).json({ success: false, message: "unknown command" });
  }
};
