const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const newPost = require('./newPost');
const apiRoutes = require('./api');

router.use('/', homeRoutes);
router.use('/newpost', newPost);
router.use('/api' ,apiRoutes )
module.exports = router;
