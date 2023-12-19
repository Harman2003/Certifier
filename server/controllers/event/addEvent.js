const Event = require("../../model/Event");

const AddEvent = async (req, res) => {
  const { id } = req.query;
  const { name, type, duration, managers, description, templateId } = req.body;
  try {
    const newEvent = {
      name: name,
      type: type,
      duration: duration,
      managers: managers,
      description: description,
      template: templateId,
      orgId: id,
    }
    const savedEvent = await Event.create(newEvent);

    res.status(200).json({ eventId: savedEvent.id });
  } catch (err) {
    console.log(err);
    res.status(500).send("Something Went Wrong");
  }
}

module.exports = AddEvent;
