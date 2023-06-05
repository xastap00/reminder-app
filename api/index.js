const {Router} = require('express');
const version = require('./version');
const reminder = require('./reminder');
const user = require('./user');
const router = Router();

router.use('/version', version);
router.use('/reminder', reminder);
router.use('/user', user);

module.exports = router;