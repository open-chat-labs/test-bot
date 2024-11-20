module.exports = ({ body }, res) => {
  console.log("Weather parameters: ", body);
  res.status(200).json({ success: true });
};
