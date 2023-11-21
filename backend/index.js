const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
console.log('Starting server...');
// Connect to the MongoDB database
mongoose.connect(
  process.env.MONGO_URI || 'mongodb://0.0.0.0:27017/topicsDB',
);

// Define a Topic model
const topicSchema = new mongoose.Schema({
  name: String,
  url: String
});
const Topic = mongoose.model('Topic', topicSchema);

// Function to initialize data in MongoDB
const initializeData = async () => {
  try {
    const count = await Topic.countDocuments();
    if (count === 0) {
      console.log('No topics found, adding default topics...');
      await Topic.create([
        { name: "Science", url: "https://www.youtube.com/embed/-PVLHNUu0vg?si=0hNp5rbNkUuC2lv8"},
        { name: "Technology", url: "https://www.youtube.com/embed/-PVLHNUu0vg?si=0hNp5rbNkUuC2lv8"},
        { name: "Mathematics", url: "https://www.youtube.com/embed/-PVLHNUu0vg?si=0hNp5rbNkUuC2lv8"},
        { name: "Arts", url: "https://www.youtube.com/embed/-PVLHNUu0vg?si=0hNp5rbNkUuC2lv8"},
        // Add more topics as needed
      ]);
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};
initializeData();

const app = express();
app.use(cors());
app.use(express.json());

// Mock user for the purpose of this example
const users = [
  {
    id: 1,
    username: "user",
    password: bcrypt.hashSync("password", 2), // hashing password for security reasons
  },
  // Add additional users as needed
];

// Define a Topic model

// API endpoint to get topics
app.get('/api/topics', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (error) {
    res.status(500).send(error);
  }
});

// API endpoint to get a topic by name
app.get('/api/topic/:name', async (req, res) => {
  try {
    const topicName = req.params.name;
    const topic = await Topic.findOne({ name: topicName }).exec();
    if (topic) {
      res.json(topic);
    } else {
      res.status(404).json({ message: 'Topic not found' });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login endpoint (NOT for production use, as it stands, for educational purposes only)
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the user by username (in a real application you would query your database)
    const user = users.find(user => user.username === username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the password is correct
    const isMatch = bcrypt.compareSync(password, user.password); 
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Successfully logged in
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).send(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
