const Users = require('../../model/User');
const getAllManagers = async (req, res) => {
    const { search } = req.query;
    if (!search || search.length<3) {
        return res.status(200).json([]);
    }
    
    try {
        const managers = await Users.find({
          email: { $regex: new RegExp(`^${search}.{3,}`, "i") },
          //role add krdo manager
        }).select("name email");
        res.status(200).json(managers);
    } catch (err) {
        console.log(err);
    }

}

module.exports = getAllManagers;