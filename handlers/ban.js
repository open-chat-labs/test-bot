module.exports = ({ body }, res) => {
  console.log("Ban parameters: ", body);
  res.status(200).json({ success: true });
};
