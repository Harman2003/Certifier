const Users = require("../../model/User");
const setOnboarding = async (req, res) => {
  const { id } = req.query;

  try {
    const user = await Users.findOne({ id: id });
    user.onboarding = false;
    await user.save();
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = setOnboarding;
