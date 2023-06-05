const {Router} = require('express');
const { StatusCodes } = require('http-status-codes');
const db = require('../../db/db');
const verifyjwt = require('./jwtVer');

const router = Router();

router.get("/", async (req, res) => {
    try {
        const jwt = verifyjwt(req.headers.authorization);
        if(jwt === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'Invalid token'
            });
        }
        const reminders = await (
            db('Reminders').where('username', '=', jwt.username).select('*')
        );
        res.json(reminders);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        console.log(e);
    }
});

module.exports = router;