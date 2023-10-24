const UserData = require("../model/UserData");
const isActive = async (req, res, next) => {
  const username = req.query.username;
  const user = await UserData.findOne({ username: username });
  user.active = new Date();
  await user.save();
  next();
};

module.exports = isActive;
