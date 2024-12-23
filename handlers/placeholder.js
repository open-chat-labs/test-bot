function placeholderMessage(txt, client, jwt) {
  return client.sendTextMessage(txt, jwt, false);
}

function placeholderResponse(text, jwt) {
  const { message_id } = jwt;
  return {
    message: {
      message_id: message_id,
      message_content: {
        Text: {
          text,
        },
      },
    },
  };
}

module.exports = {
  placeholderMessage,
  placeholderResponse,
};
