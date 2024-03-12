const router = require('express').Router();

const homeRoutes = require('./homeRoutes.js');
const loginRoutes = require('./loginRoutes.js');
const logoutRoutes = require('./logoutRoutes.js');

router.use('/',  homeRoutes);
router.use('/', loginRoutes);
router.use('/', logoutRoutes);

module.exports = router;