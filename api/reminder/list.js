const {Router} = require('express');
const { StatusCodes } = require('http-status-codes');
const db = require('../../db/db');
const verifyJwt = require('./jwtVer');

const router = Router();

router.get("/", async (req, res) => {
    try {
        const jwt = verifyJwt(req.headers.authorization);
        if(jwt === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'Invalid token'
            });
        }
        const reminders = await (
            db('Reminders').where('username', '=', jwt.username).select('*')
        );
        res.status(StatusCodes.OK);
        res.json(reminders);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        console.log(e);
    }
});

module.exports = router;