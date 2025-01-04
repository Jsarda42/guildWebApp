const mongoose = require('mongoose');

// Define the member schema
const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // Name is required
    },
    entranceDate: {
      type: Date,
      required: true,  // Entrance date is required
    },
    points: {
      type: Number,
      default: 0,  // Default value for points is 0
    },
    guild: {
      type: String,
      required: true,  // Guild is required
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create and export the Member model
module.exports = mongoose.model('Member', memberSchema);
