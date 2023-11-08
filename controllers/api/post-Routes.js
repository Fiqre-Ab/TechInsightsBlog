const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// Create a new post
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    // Create a new post and associate it with the user making the request
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    
    // Send the newly created post as a response
    res.json(newPost);
  } catch (err) {
    console.log('Post creation failed!', err);
    res.status(500).json(err);
  }
});

// Update an existing post
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Update the post based on the request body
    const [affectedRows] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log('Post update failed!', err);
    res.status(500).json(err);
  }
});

// Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const [affectedRows] = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log('Post deletion failed!', err);
    res.status(500).json(err);
  }
});

module.exports = router;
