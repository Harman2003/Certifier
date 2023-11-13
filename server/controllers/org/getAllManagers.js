const Users = require('../../model/User');
const getAllManagers = async (req, res) => {
    const { search } = req.query;
    if (!search) {
        return res.status(200).json();
    }
    
    try {
        const managers = await Users.find({
            email: { $regex: new RegExp(search, "i") },
            //role add krdo manager
        }).select("name email");
        res.status(200).json(managers);
    } catch (err) {
        console.log(err);
    }

}

module.exports = getAllManagers;