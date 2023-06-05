const {Router} = require('express');
const { StatusCodes } = require('http-status-codes');
const db = require('../../db/db');
const verifyjwt = require('./jwtVer');

const router = Router();

router.delete("/", async (req, res) => {
    try {
        const jwt = verifyjwt(req.headers.authorization);
        if(jwt === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'Invalid token'
            });
        }
        await db('Reminders').where('reminder_id', '=', req.body.reminder_id).where('username', '=', jwt.username).del();
        res.sendStatus(StatusCodes.OK);
    } catch (e) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        console.log(e);
    }
});

module.exports = router;