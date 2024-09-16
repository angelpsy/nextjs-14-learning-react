import express from 'express';
import fs from 'fs';
import cors from 'cors'; // Import the cors package
const app = express();
const PORT = 3000;
const DATA_FILE = 'dummy-backend/posts.json';

app.use(cors()); // Use the cors middleware to allow all domains
app.use(express.json());

// Helper function to read data from JSON file
const readData = () => {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  return JSON.parse(data);
};

// Helper function to write data to JSON file
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// Create a new post
app.post('/posts', async (req, res) => {
  const { author, body } = req.body;
  if (!author || !body) {
    return res.status(400).json({ message: 'Author and body are required' });
  }
  const posts = readData();
  const newPost = { id: Date.now().toString(), author, body };
  posts.push(newPost);
  writeData(posts);
  await new Promise(resolve => setTimeout(resolve, 3000));
  res.status(201).json(newPost);
});

// Get all posts
app.get('/posts', async (req, res) => {
  const posts = readData();
  await new Promise(resolve => setTimeout(resolve, 1000));
  res.json(posts);
});

// Get a single post by ID
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const posts = readData();
  const post = posts.find(p => p.id === id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Update a post by ID
app.put('/posts/:id', (req, res) => {
  const { id } = req.params;
  const { author, body } = req.body;
  if (!author || !body) {
    return res.status(400).json({ message: 'Author and body are required' });
  }
  const posts = readData();
  const postIndex = posts.findIndex(p => p.id === id);
  if (postIndex !== -1) {
    posts[postIndex] = { id, author, body };
    writeData(posts);
    res.json(posts[postIndex]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

// Delete a post by ID
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  const posts = readData();
  const newPosts = posts.filter(p => p.id !== id);
  if (posts.length !== newPosts.length) {
    writeData(newPosts);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;