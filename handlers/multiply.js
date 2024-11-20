module.exports = ({ body }, res) => {
  console.log("Multiply parameters: ", body);
  res.status(200).json({ success: true });
};
