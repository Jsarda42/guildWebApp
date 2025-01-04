const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  // Add this import
const memberRoutes = require('./routes/memberRoutes');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Base route
app.get('/', (req, res) => {
  res.send('Guild Tracker API is running');
});

// Member routes
app.use('/api/members', memberRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1); // Exit the application on connection failure
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




