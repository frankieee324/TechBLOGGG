const router = require('express').Router();

// Router for logout option
router.post('/logout', (req, res) => {
     try {
          if (req.session.loggedIn) {
               req.session.destroy(() => {
                    res.status(204).end();
               });     
          } else {
               res.status(404).end();  
          }
          return;
     } catch (err) {
          res.status(500).json(err);
     }
     res.render('login');
});

module.exports = router;

