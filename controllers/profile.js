const router = require('express').Router();

router.get('/', async (req, res) => {
// send user data to the myprofile page to be displayed later
// if res.session is not defined, redirect to login page
  if (!req.session.user) {
    res.redirect('/');
    return;
  }

  res.render('myprofile', {
    token: req.session.token,
    user: req.session.user,
  });
});

module.exports = router;
