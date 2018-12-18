const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: String,
    group_id: mongoose.Schema.Types.ObjectId,
    text: String,
})

module.exports = mongoose.model('Message', messageSchema);

