const express = require('express');
const Member = require('../models/member');
const router = express.Router();

router.get('/', async (req, res) => {
  const { guild } = req.query;
  
  try {
    const filter = guild ? { guild } : {};  // If guild is provided, filter by guild
    const members = await Member.find(filter);  // Fetch members based on filter
    res.json(members);  // Respond with members
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch members' });  // Generic error message
  }
});

// POST to create a new member
router.post('/', async (req, res) => {
	const { name, entranceDate, points, guild } = req.body;
  
	if (!name || !entranceDate || points == null || !guild) {
	  return res.status(400).json({ error: 'All fields including guild are required.' });
	}
  
	try {
	  const newMember = new Member({ name, entranceDate, points, guild });
	  await newMember.save();
	  res.status(201).json(newMember); // Return the newly created member
	} catch (err) {
	  console.error(err); // Log the error for debugging
	  res.status(500).json({ error: 'Failed to create member' });
	}
  });
  

// Delete a member by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedMember = await Member.findByIdAndDelete(req.params.id);  // Delete the member
    if (!deletedMember) {
      return res.status(404).json({ error: 'Member not found' });  // Handle case where member is not found
    }
    res.json({ message: 'Member deleted' });  // Send success message
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete member' });  // Handle any errors during deletion
  }
});

// Update member points by ID
router.put('/:id/points', async (req, res) => {
  const { points } = req.body;

  if (points == null) {
    return res.status(400).json({ error: 'Points value is required.' });  // Validation check for points
  }

  try {
    const member = await Member.findById(req.params.id);  // Find the member by ID
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });  // Handle case where member is not found
    }

    member.points = points;  // Update points
    await member.save();  // Save the updated member

    res.json(member);  // Send the updated member as a response
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update points' });  // Handle any errors during the points update
  }
});

module.exports = router;

  
