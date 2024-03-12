const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/login', (req, res) => {
     res.render('login');
});

// Checking for the login 
router.post('/login', async (req, res) => { 
     try {
          const dbUserData = await User.findOne({
               where: {
                    username: req.body.email,
               },
          });
      
          if (!dbUserData) {
               res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
               return;
          }

          const validPassword = await dbUserData.checkPassword(req.body.password);

          if (!validPassword) {
               res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
               return;
          }
      
          req.session.save(() => {
               req.session.loggedIn = true;
               req.session.sessionUserId = dbUserData.dataValues.user_id;
               req.session.sessionUserName = dbUserData.dataValues.first_name + " " + dbUserData.dataValues.last_name;
               res.status(200).render('homepage', {blogData: getAllBlogs(), loggedIn: req.session.loggedIn, sessionUserId: req.session.sessionUserId, sessionUserName: req.session.sessionUserName});
          });    
     } catch (err) {
          res.status(500).json(err);
     }
});

// Route to display the sign-up page
router.get('/signup', async (req, res) => { 
     res.render('signup');
});

// Route for the sign-up functionality
router.post('/signup', async (req, res) => { 
     try {
          const signupData = await User.create({
               first_name: req.body.firstName,
               last_name: req.body.lastName,
               username: req.body.username,
               password: req.body.password,
          });

          req.session.save(() => {
               req.session.loggedIn = true;
               req.session.sessionUserId = signupData.dataValues.user_id;
               req.session.sessionUserName = signupData.dataValues.first_name + " " + signupData.dataValues.last_name;
               res.status(200).json({ user: signupData, message: 'You are now signed up in the application!' });
          });
     } catch (err) {
          console.log("Error in Saving the User ----", err);
          res.status(500).json(err);
     }
});

// Function to get all user blog data
const getAllBlogs = async function () {
     try {
          const blogData = await Blog.findAll({
               include: [{
               model: User,
                    attributes: {
                    exclude: ["password"]
                    },
               }]
          });

          // Get the necessary data
          const filteredBlogs = blogData.map(blog => blog.get({ plain: true }));
          return filteredBlogs;
     } catch (err) {
          console.log(err);
     }
}

module.exports = router;