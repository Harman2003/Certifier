const express = require("express");
const addEvents = require("../controllers/event/addEvent");
const getEvents = require("../controllers/event/getEvent");
const updateEvent = require("../controllers/event/updateEvent");
const removeEvent = require("../controllers/event/removeEvent");
const onlyOrg = require("../middleware/onlyOrg");
const router = express.Router();

router.use(onlyOrg);
router.get("/", getEvents);
router.post("/create", addEvents);
router.put("/update", updateEvent);
router.delete("/remove", removeEvent);

module.exports = router;
