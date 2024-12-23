const { getSpotifyAccessToken, searchSpotifyAlbums } = require("./spotify");
const { placeholderResponse, placeholderMessage } = require("./placeholder");

module.exports = async (req, res) => {
  const client = req.botClient;
  const { command_args } = req.jwt;
  const [artistParam] = JSON.parse(command_args);
  const album = artistParam.value;
  const placeholder = "Searching Spotify ...";

  placeholderMessage(placeholder, client, req.originalJwt);

  res.status(200).json({
    Success: placeholderResponse(placeholder, req.jwt),
  });

  const token = await getSpotifyAccessToken();
  const item = await searchSpotifyAlbums(token, album);
  const url = item.external_urls.spotify;

  client.sendTextMessage(url, req.originalJwt, true);
};
