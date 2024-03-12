// import express package
const express = require('express');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');
// Importing handlebars
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
const allRoutes = require('./controllers');
const path = require('path');
const session = require('express-session');

// Initialize express
const app = express();

const sessionVariable = {
     secret: 'Super secret secret',
     cookie: {
     maxAge: 24 * 60 * 60 * 1000,
     },
     resave: false,
     saveUninitialized: true,
};

app.use(session(sessionVariable));

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Middleware to access for homeroutes
app.use(allRoutes);

// Set the port
const PORT = process.env.PORT || 3001;

// Commented this sequelize sync as it repeatedly sync on multiple commits and started throwing error Error Code: 1069. Too many keys specified; max 64 keys allowed
// Based on this thread, I'm commenting this as it says we dont need to sync the database frequently when no changes made on database structure
// The thread https://github.com/sequelize/sequelize/issues/9653
// Listening to the port
sequelize.sync({ force: false }).then(() => {
     app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
     });
});
