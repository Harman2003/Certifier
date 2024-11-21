const Event = require("../../model/Event");

const AddEvent = async (req, res) => {
  const { id } = req.query;
  const { name, type, duration, managers, description, templateId, image } = req.body;
  if (!name || !type || !duration) {
    return res.status(400).json({message:"Name,Type & Duration is required"});
  }
  //templateID is required as well & check that it is present and owned by Certify or this organisation
  try {
    const newEvent = {
      name: name,
      type: type,
      duration: duration,
      managers: managers,
      description: description,
      template: templateId || "65c3550c07a58ec6a2fb50cd",
      orgId: id,
      image:image
    }
    const savedEvent = await Event.create(newEvent);

    res.status(200).json({message:`Event created with ID ${savedEvent.id}`});
  } catch (err) {
    console.log(err);
    res.status(500).send("Something Went Wrong");
  }
}

module.exports = AddEvent;
