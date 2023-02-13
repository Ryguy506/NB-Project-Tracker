const router = require('express').Router();


// const withAuth = require('../utils/auth')


router.get('/', async (req, res) => {
  // Send the rendered Handlebars.js template back as the response
  res.render('addpost');
});

module.exports = router;
