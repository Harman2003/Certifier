const onlyManager = async (req, res, next) => {
  if (req.query.role !== "manager")
    return res
      .status(403)
      .json({ message: "Unauthorized to access" });
  next();
};

module.exports = onlyManager;
