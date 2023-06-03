const {Router} = require('express')
const version = require('./version')
const reminder = require('./reminder')
const router = Router();

router.use('/version', version);
router.use('/reminder', reminder);

module.exports = router;