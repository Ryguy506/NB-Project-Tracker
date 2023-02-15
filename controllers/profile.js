const router = require('express').Router();

router.get('/', async (req, res) => {
  // send uuser data to the myprofile page to be displayed later
  res.render('myprofile');
});

module.exports = router;
