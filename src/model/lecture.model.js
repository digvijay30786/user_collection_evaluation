const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    batch: { type: String, required: true }
});

module.exports = mongoose.model('lecture', lectureSchema);