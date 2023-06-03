const {Router} = require('express')

const router = Router();
const version = '1.0.0';

router.get('/', (req, res) => {
    res.json({version});
});

module.exports = router;