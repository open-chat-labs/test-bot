module.exports = async (req, res) => {
  const client = req.botClient;
  const { command_args } = req.jwt;
  const [one, two] = JSON.parse(command_args);

  console.log("arrived in the calculate handler");

  const result = one.value * two.value;

  try {
    const resp = await client.sendTextMessage(
      `Processing your stupid command`,
      req.originalJwt,
      false
    );
    console.log("Response from OC: ", resp);

    setTimeout(async () => {
      const resp = await client.sendTextMessage(
        `Calculate ${one.value} * ${two.value} = ${result}`,
        req.originalJwt,
        true
      );
      console.log("Second Response from OC: ", resp);
    }, 3000);

    res.status(200).json({ success: true, result: one.value * two.value });
  } catch (err) {
    console.error("Error calling bot client", err);
    res
      .status(500)
      .json({ success: false, message: `Error calling bot client: ${err}` });
  }
};
