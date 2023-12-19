const Event = require("../../model/Event");

const updateEvent = async (req, res) => {
  try {
    const { id } = req.query;
    const { eventId, name, type, duration, managers, description, templateId } = req.body;
    
    const currentEvent = await Event.findOne({ id: eventId });
    if (!currentEvent) return res.sendStatus(404);
    if (currentEvent.orgId !== id) return res.status(403).json({ message: "Unauthorized" });

    const updatedEvent = {};
    const key = [
      "name",
      "type",
      "duration",
      "managers",
      "description",
      "templateId",
    ];
    [name, type, duration, managers, description, templateId].forEach((value, index) => {
      if (value) {
        updatedEvent[key[index]] = value;
      }
    })

    console.log(updatedEvent)

    await Event.updateOne(
      { id: eventId },
      {
        $set: updatedEvent,
      }
    );
    return res.status(204).json({message:"Event Updated Success"})
  } catch (err) {
    console.log(err);
    return res.status(500).send("Something went wrong");
  }
};

module.exports = updateEvent;
