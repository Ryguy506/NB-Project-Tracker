const router = require('express').Router();


// const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  // if res.session is not defined, redirect to login page
  if (!req.session.user) {
    res.redirect('/');
    return;
  }
  // send user session data to the addpost page
  res.render('addpost', {
    token: req.session.token,
    user: req.session.user,
  });
});

module.exports = router;
