const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  entranceDate: {
    type: Date,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;


