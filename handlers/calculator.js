module.exports = (params, res) => {
  const [one, two] = params;

  res.status(200).json({ success: true, result: one.value * two.value });
};
