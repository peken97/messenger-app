const mongoose = require("mongoose");

const groupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    group_name: String,
    users: Array,
    messages: Array,
    admins: Array
})

module.exports = mongoose.model('Group', groupSchema);

