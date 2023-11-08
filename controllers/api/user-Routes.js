const router = require('express').Router();
const { User } = require('../../models');

// Sign Up
router.post('/', async (req, res) => {
  try {
    // Create a new user based on the request data
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // Save user information in the session and return the new user data
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    // Find a user by their username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    // Check the password provided against the stored hash
    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    // Save user information in the session and return a success message
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json({ message: 'Login failed!' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Destroy the session on logout
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
