const Event = require("../../model/Event");
const User = require("../../model/User");

const AddEvent = async (req, res) => {
  try{
    const event = await Event.create({
      eventname: req.body.name,
    });
    const Inputuser=req.body.user;
    const user = await User.findOne({username:Inputuser});
    user.eventIds.push(event._id);
    await user.save();
    console.log(event.certificateIds);
    const num = event.certificateIds.length;
    const newEvent = {
      EventName:event.eventname,
      EventId:event._id,
      Certification:num,
    }
    res.status(200).send(newEvent);
  }
  catch(err){
    console.log(err);
    res.status(404).send("Error");
  }
};

module.exports = AddEvent;
