const express = require("express");
const getMyDetails = require("../controllers/common/getMyDetails");
const router = express.Router();

router.get("/details", getMyDetails);

module.exports = router;
