const express = require("express");
const getAllManagers = require("../controllers/org/getAllManagers");
const router = express.Router();

router.get("/get_managers", getAllManagers);

module.exports = router;
