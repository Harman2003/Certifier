const Template = require("../../model/Template");

const updateTemplate = async (req, res) => {
    const { id } = req.query;
    const { templateId, data } = req.body;

  try {
    const savedTemplate = await Template.findById(templateId);
    if (savedTemplate.orgId === "certify" || savedTemplate.orgId !== id) {
      return res.sendStatus(401);
    }
    await Template.updateOne({ _id: templateId }, {$set:{data:data}});
    return res.status(201).json({ message: "Template Updated Successfully" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = updateTemplate;
