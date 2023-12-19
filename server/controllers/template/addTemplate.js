const Template = require("../../model/Template");

const AddTemplate = async (req, res) => {
  const { data, img } = req.body;
  const { id } = req.query;

  if (!data || !img) {
    return res.status(400).json({ message: "Invalid template" });
  }
  const newTemplate = {
    data: data,
    img: img,
    orgId: id,
  };
  try {
    await Template.create({ newTemplate });
    return res.status(200).json({ message: "Saved to your collection" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

module.exports = AddTemplate;
