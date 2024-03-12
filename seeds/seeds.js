const sequelize = require('../config/connection');
const { User, Blog, BlogComments } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const blogCommentData = require('./blogCommentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Blog.bulkCreate(blogData, {
    returning: true,
  });

   await BlogComments.bulkCreate(blogCommentData, {
    returning: true,
  });


  process.exit(0);
};

seedDatabase();
