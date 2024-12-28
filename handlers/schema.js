const emptyPermissions = {
  chat: [],
  community: [],
  message: [],
};

module.exports = (_, res) => {
  res.status(200).json({
    description: "This is my lovely bot and it is valid",
    commands: [
      {
        name: "artist",
        description: "Search for an artist on Spotify",
        permissions: {
          ...emptyPermissions,
          message: ["Text"],
        },
        params: [
          {
            name: "artist",
            required: true,
            description: "The artist to search for",
            placeholder: "Enter artist name",
            param_type: {
              StringParam: {
                min_length: 1,
                max_length: 100,
                choices: [],
              },
            },
          },
        ],
      },
      {
        name: "song",
        description: "Search for a song on Spotify",
        permissions: {
          ...emptyPermissions,
          message: ["Text"],
        },
        params: [
          {
            name: "song",
            required: true,
            description: "The song to search for",
            placeholder: "Enter song name",
            param_type: {
              StringParam: {
                min_length: 1,
                max_length: 100,
                choices: [],
              },
            },
          },
        ],
      },
      {
        name: "album",
        description: "Search for an album on Spotify",
        permissions: {
          ...emptyPermissions,
          message: ["Text"],
        },
        params: [
          {
            name: "album",
            required: true,
            description: "The album to search for",
            placeholder: "Enter album name",
            param_type: {
              StringParam: {
                min_length: 1,
                max_length: 100,
                choices: [],
              },
            },
          },
        ],
      },
    ],
  });
};
