const express = require("express");
const fontsController = require("../controllers/template/getFontsController");
const router = express.Router();

router.get("/fonts", fontsController);

module.exports = router;
