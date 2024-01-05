const Event = require("../../model/Event");
const Certificates = require("../../model/Certificate");
const removeEvent = async (req, res) => {
  const { id, eventId } = req.query;
  
  try {
    const currentEvent = await Event.findOne({ eventId: eventId });
    if (!currentEvent) return res.sendStatus(404);
    if (currentEvent.orgId !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    
    await Certificates.deleteMany({ event: currentEvent._id });
    await Event.deleteOne({ id: eventId });

    return res.status(201).json({ message: "Event Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports = removeEvent;
