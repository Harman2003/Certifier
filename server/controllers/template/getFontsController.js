const Fonts = require("../../model/Fonts");
async function getFontController(req, res) {
  try {
    const { limit, offset, q } = req.query;

    const limitNumber = parseInt(limit, 10);
    const offsetNumber = parseInt(offset, 10);
    const filter = {
      name: { $regex: `^${q}`, $options: "i" },
    };

    const fonts = await Fonts.find(filter)
      .skip(offsetNumber)
      .limit(limitNumber);

    res.json(fonts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = getFontController;
