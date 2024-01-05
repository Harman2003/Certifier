const express = require("express");
const router = express.Router();
const onlyOrg= require("../middleware/onlyOrg")
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadImg = require("../controllers/common/uploadImg");
const getAllManagers = require("../controllers/common/getAllManagers");

router.post("/upload", upload.single('image'), onlyOrg, uploadImg);
router.get("/get_managers", getAllManagers);

module.exports = router;
