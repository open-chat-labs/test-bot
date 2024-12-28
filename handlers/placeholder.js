const { success } = require("./success");

function placeholderMessage(txt, client, jwt) {
  return client.sendTextMessage(txt, jwt, false);
}

function placeholderResponse(text, jwt) {
  const { message_id } = jwt;
  return success({
    id: message_id,
    content: {
      Text: {
        text,
      },
    },
  });
}

module.exports = {
  placeholderMessage,
  placeholderResponse,
};
