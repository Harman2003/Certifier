const Template = require("../../model/Template");

const removeTemplate = async (req, res) => {
  const { id, templateId } = req.query;

  try {
    const savedTemplate = await Template.findById(templateId);
    if (savedTemplate.orgId === "certify" || savedTemplate.orgId !== id) {
      return res.sendStatus(401);
    }
    await Template.deleteOne({ _id: templateId });
    return res.status(201).json({ message: "Template Deleted Successfully" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = removeTemplate;
