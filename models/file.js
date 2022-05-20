const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// Blueprint of schema in database
const fileSchema = new Schema({
    filename: {type: String, required: true},
    path: {type: String, required: true},
    size: {type: Number, required: true},
    uuid: {type: String, required: true},
    sender: {type: String, required: false},          // only when someone wants to send email
    receiver: {type: String, required: false}
}, { timestamps: true });

module.exports = mongoose.model('File',fileSchema);