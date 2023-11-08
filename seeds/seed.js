const sequelize = require('../config/config');
const { User, Post } = require('../models'); // Import User and Post models

const userData = require('./userData.json'); // Note the '.json' extension
const postData = require('./postData.json'); // Note the '.json' extension

// Function to seed the database with user and post data
const seedAll = async () => {
  // Synchronize the database and force it to drop and re-create tables
  await sequelize.sync({ force: true });

  // Seed user data
  await User.bulkCreate(userData, {
    individualHooks: true, // Enable hooks for user creation
    returning: true,
  });

  // Seed post data
  await Post.bulkCreate(postData);

  // Exit the process when seeding is complete
  process.exit(0);
};

// Call the seedAll function to start seeding the database
seedAll();
