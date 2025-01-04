const express = require('express');
const Member = require('../models/member');

const router = express.Router();

// Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

// Add a new member
router.post('/', async (req, res) => {
  const { name, entranceDate,  points} = req.body;

  try {
    const newMember = new Member({ name, entranceDate, points });
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
router.patch('/:id/points', async (req, res) => {
  const { points } = req.body;

  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    member.points += points;
    await member.save();
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update points' });
  }
});

module.exports = router;
