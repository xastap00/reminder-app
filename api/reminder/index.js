const {Router} = require('express');
const create = require('./create');
const router = Router();

router.use('/create', create);

module.exports = router;