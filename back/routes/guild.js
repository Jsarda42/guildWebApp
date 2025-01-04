const express = require('express');
const Guild = require('../models/guild');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const guilds = await Guild.find(); // Fetch all guilds
    res.json(guilds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch guilds' });
  }
});

// Add this to routes/guildRoutes.js

// Create a new guild
router.post('/', async (req, res) => {
	const { name, minimumPoints } = req.body;
  
	if (!name) {
	  return res.status(400).json({ error: 'Guild name is required.' });
	}
  
	try {
	  const newGuild = new Guild({ name, minimumPoints });
	  await newGuild.save();
	  res.status(201).json(newGuild);
	} catch (err) {
	  console.error(err);
	  res.status(500).json({ error: 'Failed to create guild.' });
	}
  });
  

// Get a single guild by name
router.get('/:name', async (req, res) => {
  try {
    const guild = await Guild.findOne({ name: req.params.name });
    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }
    res.json(guild);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch guild' });
  }
});

// Update minimum points for a guild
router.put('/:name/minimum-points', async (req, res) => {
  const { minimumPoints } = req.body;

  if (minimumPoints == null) {
    return res.status(400).json({ error: 'Minimum points value is required.' });
  }

  try {
    const guild = await Guild.findOneAndUpdate(
      { name: req.params.name },
      { minimumPoints },
      { new: true, runValidators: true } // Return updated document
    );

    if (!guild) {
      return res.status(404).json({ error: 'Guild not found' });
    }

    res.json(guild);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update minimum points' });
  }
});

module.exports = router;
