const { BotClient } = require("@open-ic/openchat-botclient");

const createBotClient = (privateKey, icHost, storageIndexCanister) => {
  return (req, res, next) => {
    if (!req.jwt) {
      console.log("unable to determine bot client canisterId");
      next();
    } else {
      try {
        const { bot_api_gateway, chat } = req.jwt;
        const config = {
          botGatewayCanisterId: bot_api_gateway,
          openStorageCanisterId: storageIndexCanister,
          icHost,
          identityPrivateKey: privateKey,
          chatId: chat,
        };
        req.botClient = new BotClient(config);
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
