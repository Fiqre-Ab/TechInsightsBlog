const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    commentContent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Reference the 'user' model
        key: 'id', // Using the 'id' field as the reference
      },
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post', // Reference the 'post' model
        key: 'id', // Using the 'id' field as the reference
      },
    },
  },
  {
    sequelize,
    timestamps: false, // Disable automatic timestamps for this model
    freezeTableName: true, // Use the same model name for the table name
    underscored: true, // Use underscores in column names
    modelName: 'comment', // Model name for associations
  }
);

module.exports = Comment;
