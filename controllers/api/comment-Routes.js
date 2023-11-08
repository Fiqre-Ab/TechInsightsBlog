const router = require('express').Router();
const { Comment, User } = require('../../models/');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [User],
    });

    // Serialize the data
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    console.log(comments);
  
    res.render('single-post', { comments, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json(err);
  }
});

// Create a new comment
router.post('/', withAuth, async (req, res) => {
  const body = req.body;

  try {
    const newComment = await Comment.create({
      ...body,
      userId: req.session.userId,
    });
    res.json(newComment);
  } catch (err) {
    console.error('Comment creation failed:', err);
    res.status(500).json(err);
  }
});

module.exports = router;
