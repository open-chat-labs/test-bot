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
      {
        name: "calculate",
        description: "Do some calculations on two numbers",
        permissions: emptyPermissions,
        params: [
          {
            name: "number_one",
            required: true,
            description: "Enter the first number",
            placeholder: "First number",
            param_type: {
              NumberParam: {
                min_value: 0,
                max_value: 10000,
                choices: [],
              },
            },
          },
          {
            name: "number_two",
            required: true,
            description: "Enter the second number",
            placeholder: "Second number",
            param_type: {
              NumberParam: {
                min_value: 0,
                max_value: 10000,
                choices: [],
              },
            },
          },
        ],
      },
      {
        name: "chat",
        description: "Ask OpenChat AI a question",
        permissions: {
          ...emptyPermissions,
          chat: ["ReactToMessages", "PinMessages", "StartVideoCall"],
          message: ["Text", "Image", "File"],
        },
        params: [
          {
            name: "prompt",
            required: true,
            description: "The text prompt to use for your AI query",
            placeholder: "Enter prompt",
            param_type: {
              NumberParam: {
                min_value: 0,
                max_value: 1000,
                choices: [],
              },
            },
          },
        ],
      },
      {
        name: "weather",
        description: "Show me the weather for tomorrow",
        permissions: {
          ...emptyPermissions,
          message: ["Text", "Giphy"],
        },
        params: [
          {
            name: "city",
            required: true,
            description: "Please select the city for requested forecast",
            placeholder: "Select city",
            param_type: {
              StringParam: {
                min_length: 0,
                max_length: 100,
                choices: [
                  { name: "London", value: "london" },
                  { name: "Paris", value: "paris" },
                  { name: "Rome", value: "rome" },
                  { name: "New York", value: "new_york" },
                ],
              },
            },
          },
        ],
      },
    ],
  });
};
