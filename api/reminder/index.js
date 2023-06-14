const {Router} = require('express');
const create = require('./create');
const update = require('./update');
const list = require('./list');
const dlt = require('./delete');
const listNotes = require('./listNotes');
const router = Router();
// TODO methods for Snoozed Notes
router.use('/create', create);
router.use('/update', update);
router.use('/list', list);
router.use('/listNotes', listNotes);
router.use('/delete', dlt);

module.exports = router;