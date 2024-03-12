const User = require('./User');
const Blog = require('./Blog');
const BlogComments = require('./BlogComments');

Blog.belongsTo(User, {
     foreignKey: 'user_id',
});

BlogComments.belongsTo(Blog, {
     foreignKey: 'blog_id',
});

BlogComments.belongsTo(User, {
     foreignKey: 'user_id',
});

User.hasMany(Blog, {
     foreignKey: 'user_id',
});

Blog.hasMany(BlogComments, {
     foreignKey: 'blog_id',
});

BlogComments.hasMany(Blog, {
     foreignKey: 'blog_id',
});

BlogComments.hasMany(User, {
     foreignKey: 'user_id',
});


module.exports = {User, Blog, BlogComments}