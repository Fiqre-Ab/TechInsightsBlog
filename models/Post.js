const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    postTitle: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true, // Ensure post titles are unique
    },
    postContent: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure post content is unique
    },
    dateCreated: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Set the default value to the current date
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', // Reference the 'user' model
        key: 'id', // Refer to the 'id' attribute of the 'user' model
      },
    },  
  },
  {
    sequelize,
    timestamps: false, // Disable timestamps (created at, updated at)
    freezeTableName: true, // Prevent table name pluralization
    underscored: true, // Use snake_case for field names
    modelName: 'post', // Define the model name
  }
);

module.exports = Post;
