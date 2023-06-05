const {Router} = require('express');
const reminder = require('./reminder');
const user = require('./user');
const router = Router();

router.use('/reminder', reminder);
router.use('/user', user);

module.exports = router;