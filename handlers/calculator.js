module.exports = (req, res) => {
  const client = req.botClient;
  const { command_args } = req.jwt;
  const [one, two] = JSON.parse(command_args);

  console.log("arrived in the calculate handler");

  const result = one.value * two.value;

  client
    .sendTextMessage(
      `Calculate ${one.value} * ${two.value} = ${result}`,
      req.originalJwt,
      true
    )
    .then((result) => {
      console.log("Response from OC: ", result);
      res.status(200).json({ success: true, result: one.value * two.value });
    })
    .catch((err) => {
      console.error("Error calling bot client", err);
      res
        .status(500)
        .json({ success: false, message: `Error calling bot client: ${err}` });
    });
};
