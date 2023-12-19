const onlyOrg = async (req, res, next) => {
   if (req.query.role !== "org")
     return res
       .status(403)
       .json({ message: "Unauthorized to access" });
  next();
};

module.exports = onlyOrg;
