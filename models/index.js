const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between User, Post, and Comment models
User.hasMany(Post, {
  foreignKey: 'userId', // Create a one-to-many relationship: one User has many Posts
  onDelete: 'CASCADE', // When a User is deleted, delete associated Posts
});

User.hasMany(Comment, {
  foreignKey: 'userId', // Create a one-to-many relationship: one User has many Comments
  onDelete: 'CASCADE', // When a User is deleted, delete associated Comments
});

Post.belongsTo(User, {
  foreignKey: 'userId', // Create a many-to-one relationship: one Post belongs to one User
  onDelete: 'CASCADE', // When a Post is deleted, delete its association with a User
});

Post.hasMany(Comment, {
  foreignKey: 'postId', // Create a one-to-many relationship: one Post has many Comments
  onDelete: 'CASCADE', // When a Post is deleted, delete associated Comments
});

Comment.belongsTo(User, {
  foreignKey: 'userId', // Create a many-to-one relationship: one Comment belongs to one User
});

Comment.belongsTo(Post, {
  foreignKey: 'postId', // Create a many-to-one relationship: one Comment belongs to one Post
});

module.exports = {
  User,
  Comment,
  Post,
};
