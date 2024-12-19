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
        name: "ban",
        description: "ban a person from this chat",
        permissions: emptyPermissions,
        params: [
          {
            name: "username",
            required: true,
            description: "Please enter the user that you would like to ban.",
            placeholder: "User to ban",
            param_type: "UserParam",
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
                min_length: 0,
                max_length: 10000,
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
                min_length: 0,
                max_length: 10000,
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
                min_length: 0,
                max_length: 1000,
                choices: [],
              },
            },
          },
        ],
      },
      {
        name: "multiply",
        description: "Multiply some number I pick",
        permissions: emptyPermissions,
        params: [
          {
            name: "number",
            required: true,
            description: "Please select a number from the list",
            placeholder: "Select number",
            param_type: {
              NumberParam: {
                min_length: 0,
                max_length: 100,
                choices: [
                  { name: "One", value: 1 },
                  { name: "Ten", value: 10 },
                  { name: "Twenty", value: 20 },
                  { name: "Forty five", value: 45 },
                ],
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
