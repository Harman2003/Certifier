const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema({
    eventname: {
        type: String,
        required: true
    },
    certificateIds: [{type: mongoose.Types.ObjectId, ref: "Certificate"}]
},{
    timestamps: true
});

module.exports = mongoose.model('Event',Event);