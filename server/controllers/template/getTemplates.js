const Template = require("../../model/Template");

const getTemplates = async (req, res) => {
    const { id, certifyTemplate } = req.query;
    
  try {
      const savedTemplate = await Template.findOne({ orgId: certifyTemplate?"certify":id });
      return res.status(201).json({ savedTemplate });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = getTemplates;
