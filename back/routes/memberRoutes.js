const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const memberSchema = new mongoose.Schema({
	name: { type: String, required: true },
	entranceDate: { type: Date, required: true },
	points: { type: Number, default: 0 },
	guild: { type: String, required: true }  // Ensure the 'guild' field is required
  });
  
  module.exports = mongoose.model('Member', memberSchema);

// Get all members or filter by guild
router.get('/', async (req, res) => {
  const { guild } = req.query;

  try {
    const filter = guild ? { guild } : {};
    const members = await Member.find(filter);
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Add a new member
router.post('/', async (req, res) => {
  const { name, entranceDate, points, guild } = req.body;

  if (!name || !entranceDate || points == null || !guild) {
    return res.status(400).json({ error: 'All fields including guild are required.' });
  }

  try {
    const newMember = new Member({ name, entranceDate, points, guild });
    await newMember.save();
    res.status(201).json(newMember);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create member' });
  }
});

// Delete a member
router.delete('/:id', async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete member' });
  }
});

// Update member points
router.put('/:id/points', async (req, res) => {
  const { points } = req.body;

  if (points == null) {
    return res.status(400).json({ error: 'Points value is required.' });
  }

  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    member.points = points;
    await member.save();
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update points' });
  }
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'An internal error occurred.' });
});

module.exports = router;

