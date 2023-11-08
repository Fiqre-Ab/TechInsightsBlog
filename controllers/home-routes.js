const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth');

// Get all posts for the homepage
router.get('/', async (req, res) => {
  try {
    // Retrieve all posts, including associated users
    const postData = await Post.findAll({
      include: [User],
    });

    // Serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the 'all-posts-admin' view
    res.render('all-posts-admin', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    // Retrieve a post and its associated data (users and comments)
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      // Serialize the data
      const post = postData.get({ plain: true });

      // Render the 'homepage' view for a single post
      res.render('homepage', { post, loggedIn: req.session.loggedIn });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login and signup routes (no changes needed)
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
