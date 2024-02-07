const Template = require("../../model/Template");

const getTemplates = async (req, res) => {
    const { id, isDefault } = req.query;
    
  try {
      const templates = await Template.find({ orgId: isDefault?"certify":id });
      return res.status(201).json({ templates });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = getTemplates;
