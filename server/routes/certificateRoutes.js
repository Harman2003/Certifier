const express = require("express");
const addCertificate = require("../controllers/certificate/addCertificate");
const getCertificate = require("../controllers/certificate/getCertificate");
const revokeCertificate = require("../controllers/certificate/revokeCertificate");
const onlyOrg = require("../middleware/onlyOrg");
const router = express.Router();

router.use(onlyOrg);
router.get("/", getCertificate);
router.post("/create", addCertificate);
router.put("/revoke", revokeCertificate);

module.exports = router;
