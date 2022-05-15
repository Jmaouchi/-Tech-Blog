const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class Comment extends Model {}

// create fields/columns for User model
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    comment_name: {
      type: DataTypes.TEXT,
      allowNull: false,

    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        Model: 'User',
        key: 'id'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;
