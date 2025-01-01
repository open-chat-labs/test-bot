const { getSpotifyAccessToken, searchSpotifyArtists } = require("./spotify");
const { placeholderResponse, placeholderMessage } = require("./placeholder");

module.exports = async (req, res) => {
  const client = req.botClient;
  const { command_args } = req.jwt;
  const [artistParam] = JSON.parse(command_args);
  const artist = artistParam.value;
  const placeholder = `Searching Spotify for ${artist} ...`;

  placeholderMessage(placeholder, client, req.originalJwt);

  res.status(200).json(placeholderResponse(placeholder, req.jwt));

  const token = await getSpotifyAccessToken();
  const item = await searchSpotifyArtists(token, artist);
  const url = item.external_urls.spotify;

  client.sendTextMessage(req.originalJwt, true, url);
};
