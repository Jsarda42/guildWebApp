const mongoose = require('mongoose');

// Define the guild schema
const guildSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,  // Guild name is required
      unique: true,    // Guild names must be unique
    },
    minimumPoints: {
      type: Number,
      default: 0,      // Default value for minimum points is 0
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

// Create and export the Guild model
module.exports = mongoose.model('Guild', guildSchema);
