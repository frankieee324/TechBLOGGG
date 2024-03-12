const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Blog = require('./Blog');
const User = require('./User');

class BlogComments extends Model { }

BlogComments.init(
     {
          comment_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement:true,
          },
          blog_id: {
               type: DataTypes.INTEGER,
               allowNull:false,
               references: {
                    model: Blog,
                    key:'blog_id',
               },
          },
          user_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: User,
                    key:'user_id',
               },           
          },
          comment_post: {
               type: DataTypes.TEXT,
               allowNull:false,
          },
     },
     {
          sequelize,
          timestamps: true,
          freezeTableName: true,
          underscored: true,
          modelName:'blog_comments',
     }
);


module.exports = BlogComments;