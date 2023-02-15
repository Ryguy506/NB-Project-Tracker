const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const newPost = require('./newPost');
const apiRoutes = require('./api');
const myprofile = require('./profile');

router.use('/', homeRoutes);
router.use('/newpost', newPost);
router.use('/api' ,apiRoutes );
router.use('/profile', myprofile)
module.exports = router;
