const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Enable CORS for all routes
const memberRoutes = require('./routes/memberRoutes');
const mongoose = require('mongoose');

dotenv.config(); // Load environment variables from .env

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming requests with JSON payloads

// Base route
app.get('/', (req, res) => {
  res.send('Guild Tracker API is running');
});

// Member routes
app.use('/api/members', memberRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the application if connection fails
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
