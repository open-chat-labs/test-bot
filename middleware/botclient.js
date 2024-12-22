const { BotClient } = require("@open-ic/openchat-botclient");

const createBotClient = (privateKey, icHost) => {
  return (req, res, next) => {
    if (!req.jwt) {
      console.log("unable to determine bot client canisterId");
      next();
    } else {
      try {
        const { bot_api_gateway } = req.jwt;
        req.botClient = new BotClient(privateKey, bot_api_gateway, icHost);
        console.log("Bot client created");
        next();
      } catch (err) {
        console.log("Error creating bot client: ", err);
        return res
          .status(500)
          .json({ success: false, message: "Unable to create bot client" });
      }
    }
  };
};

module.exports = createBotClient;
