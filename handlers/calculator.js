module.exports = ({ body }, res) => {
  console.log("JWT: ", req.jwt);

  const [one, two] = body;
  const result = Number(one.value) * Number(two.value);
  res.status(200).json({ success: true, result });
};
