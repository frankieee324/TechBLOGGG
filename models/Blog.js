const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Blog extends Model { }

//Referred the stackoverflow for foreign key set up, https://stackoverflow.com/questions/58476839/how-do-i-set-a-foreign-key-for-a-sequelize-model

Blog.init(
     {
          blog_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               primaryKey: true,
               autoIncrement:true,
          },
          user_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               references: {
                    model: User,
                    key:'user_id',
               },           
          },
          blog_title: {
               type: DataTypes.STRING,
               allowNull:false,
          },
          blog_post: {
               type: DataTypes.TEXT,
               allowNull:false,  
          },
     },
     {
          sequelize,
          timestamps: true,
          freezeTableName: true,
          underscored: true,
          modelName:'blog',
     }
);

module.exports = Blog;