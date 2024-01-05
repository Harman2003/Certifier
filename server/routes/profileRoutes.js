const express = require("express");
const onboarding = require("../controllers/profile/getOnboarding");
const setOnboarding = require("../controllers/profile/setOnboarding");
const router = express.Router();

router.get("/onboard", onboarding);
router.post("/onboard", setOnboarding);

module.exports = router;
