const mongoose = require('mongoose');

// create student schema
const studentSchema = new mongoose.Schema({
    roll_number: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    batch: { type: String, require: false, default: "web_13" }
});

module.exports = mongoose.model('student', studentSchema); //students collection in evaluation database