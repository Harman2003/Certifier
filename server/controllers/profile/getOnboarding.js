const Users = require("../../model/User");
const getOnboarding = async (req, res) => {
  const { id } = req.query;

  try {
    const user = await Users.findOne({ id: id });
    res.status(200).json({onboarding:user.onboarding});
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = getOnboarding;
