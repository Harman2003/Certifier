const Certificate = require("../../model/Certificate");
const Event = require("../../model/Event");

const revokeCertificate = async (req, res) => {
  try {
    var eventid = req.body.eventid;
    var event = await Event.findById({ _id: eventid });
    var result = [];
    let list = event.certificateIds;
    const certis = await Certificate.find({ _id: { $in: list } });
    for (let certi of certis) {
      const username = certi.username;
      const expiry = certi.expiry;
      const created_at = certi.createdAt;
      const email = certi.email;
      const id = certi.certificateId;
      result.push({ username, expiry, created_at, email, id });
    }
    res.send(result);
  } catch (err) {
    console.log("Error in getting Certificates");
    res.status(404).send("Error in getting Previous Data");
  }
};

module.exports = revokeCertificate;
