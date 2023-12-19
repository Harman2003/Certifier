const express = require("express");
const getAllManagers = require("../controllers/common/getAllManagers");
const router = express.Router();

router.get("/get_managers", getAllManagers);

module.exports = router;
