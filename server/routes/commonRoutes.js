const express = require("express");
const fontsController = require("../controllers/template/getFonts");
const router = express.Router();

router.get("/fonts", fontsController);

module.exports = router;
