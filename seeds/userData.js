const { User } = require('../models');

const userData = [
  {
    username: 'smith',
    password: 'password'
  },
  {
    username: 'james',
    password: 'password'
  },
  {
    username: 'will',
    password: 'password'
  }
];

const seedUser = async () => {
  try {
    const createdUsers = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    return createdUsers;
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

module.exports = seedUser;
