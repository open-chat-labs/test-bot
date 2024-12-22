const { getSpotifyAccessToken, searchSpotifySongs } = require("./spotify");

function placeholderMessage(client, jwt) {
  client.sendTextMessage("Searching Spotify ...", jwt, false);
}

module.exports = async (req, res) => {
  const client = req.botClient;
  const { command_args } = req.jwt;
  const [artistParam] = JSON.parse(command_args);
  const song = artistParam.value;

  res.status(200).json({ success: true });

  placeholderMessage(client, req.originalJwt);

  const token = await getSpotifyAccessToken();
  const item = await searchSpotifySongs(token, song);
  const url = item.external_urls.spotify;

  client.sendTextMessage(url, req.originalJwt, true);
};
