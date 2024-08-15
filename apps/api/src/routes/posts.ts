import express from 'express';

export const getPost = (id: string) => {
  return posts.find((p) => p.id === id);
};

export const getPostbyCategory = (category: string) => {
  return posts.find((p) => p.category === category);
};

const router = express.Router();

const posts = [];

// Get all posts
router.get('/', (req, res) => {
  // Return all the posts with a 200 status code
  res.status(200).json(posts);
});

// Get post by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;

  const post = getPostbyCategory(category);

  if (!post) {
    return res.status(404).json({ message: 'Post not found by category' });
  }

  res.status(200).json(post);
});

// Get post by id
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const post = getPost(id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.status(200).json(post);
});

// Create post
router.post('/', (req, res) => {
  const { title, image, description, category } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'The title is required.' });
  }
  if (!image) {
    return res.status(400).json({ message: 'The image is required.' });
  }
  if (!description) {
    return res.status(400).json({ message: 'The description is required.' });
  }
  if (!category) {
    return res.status(400).json({ message: 'The category is required.' });
  }

  // Generate a new post
  const newPosts = {
    id: Date.now().toString(), // Convert id to string to match the value in get by id endpoint
    title,
    image,
    description,
    category
  };
  // Add the new post to our array
  posts.push(newPosts);

  // Return the created post with a 201 status code
  res.status(201).json(newPosts);
});

// Create comments
router.post('/:id/comments', (req, res) => {
  const { id } = req.params
  const { author, content } = req.body;

  if (!author) {
    return res.status(400).json({ message: 'The author is required.' });
  }
  if (!content) {
    return res.status(400).json({ message: 'The content is required.' });
  }

  // Generate a new comment
  const addComment = {
    id,
    author,
    content
  };
  // Add the new comment to our array
  posts.push(addComment);

  // Return the created comment with a 201 status code
  res.status(201).json(addComment);
});

// Update posts by id
router.patch('/:id', (req, res) => {
  const { id } = req.params

  const postbyId = posts.findIndex((p) => p.id === id);

  if (postbyId === -1) {
    // If we don't find the posts return a 404 status code with a message
    return res.status(404).json({ message: 'Post not found' });
  }

  // Generate a copy of our posts
  const updatedPost = { ...posts[postbyId] };
  const { title } = req.body;

  if (title) {
    updatedPost.title = title;
  }

  /// Update the posts in our array
  posts[postbyId] = updatedPost;

  // Return the updated post with a 201 status code
  res.status(201).json(updatedPost);
});

// Delete post by id
router.delete('/:id', (req, res) => {
  // Retrieve the id from the route params
  const { id } = req.params;
  // Retrieve the index of the post in the array
  const postIndex = posts.findIndex((p) => p.id === id);

  // "findIndex" will return -1 if there is no match
  if (postIndex === -1) {
    // If we don't find the post return a 404 status code with a message
    return res.status(404).json({ message: 'Post not found' });
  }

  // Remove the post from the array
  posts.splice(postIndex, 1);

  // Return a 204 status code
  res.status(204).send();
});

export default router;
