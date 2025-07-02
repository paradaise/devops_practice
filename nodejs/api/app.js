import Post from './posts.js';
import express from 'express';
import mongoose from 'mongoose';

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

app.post('/', async (req, res) => {
  try {
    
    const post = await Post.create({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
      picture: req.body.picture
    });
    
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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 

