const express = require("express");
const fontsController = require("../controllers/template/getFonts");
const AddTemplate = require("../controllers/template/addTemplate");
const getTemplates = require("../controllers/template/getTemplates");
const multer = require("multer");
const storage = multer.memoryStorage();
const form = multer({ storage: storage });
const router = express.Router();

router.post("/create", form.any(), AddTemplate);
router.get("/", getTemplates);
router.get("/fonts", fontsController);

module.exports = router;
