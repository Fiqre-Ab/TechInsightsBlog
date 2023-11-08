const router = require('express').Router();
const { Post, User } = require('../models/');
const withAuth = require('../utils/auth');

// Display all posts in the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    // Retrieve posts created by the current user (based on userId)
    const postData = await Post.findAll({
      where: { userId: req.session.userId },
      include: [User],
    });

    // Serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'all-posts' view with a different layout
    res.render('all-posts', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

// Route for creating a new post
router.get('/new', withAuth, (req, res) => {
  // Render the 'new-post' view with a different layout
  res.render('new-post', {
    layout: 'dashboard',
  });
});

// Route for editing a specific post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Retrieve the post by its ID
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      // Serialize the data
      const post = postData.get({ plain: true });

      // Render the 'edit-post' view with a different layout
      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

module.exports = router;
