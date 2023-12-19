const Users = require("../../model/User.js");
const getMyDetails = async (req, res) => {
  const { email } = req.query;
  // console.log(email)
  try {
    const user = await Users.findOne({
      email: email
    }).select("name id role");
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

module.exports = getMyDetails;
