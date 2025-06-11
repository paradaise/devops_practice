// Import the express library
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB:', err));

// Example schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.post('/', async (req, res) => {
  try {
    // Example: Create a new user
    if (req.body.name && req.body.email && req.body.age) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
      });
      await user.save();
      return res.status(201).json({
        message: 'User created successfully',
        user
      });
    }

    res.status(200).json({
      message: 'Server Works!',
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error occurred',
      error: error.message
    });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching users',
      error: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 

