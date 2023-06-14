const {Router} = require('express');
const { StatusCodes } = require('http-status-codes');
const db = require('../../db/db');
const verifyJwt = require('./jwtVer');
const { send } = require('process');

const router = Router();

router.post("/", async (req, res) => {
    try {
        const jwt = verifyJwt(req.headers.authorization);
        if(jwt === null) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                msg: 'Invalid token'
            });
        }
        const data = {
            username: jwt.username ,
            date: req.body.datetime, 
            description: req.body.description
        }
        const inserted = await db('Reminders').insert(data)

        res.sendStatus(StatusCodes.OK);
    } catch (e) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        console.log(e);
    }
});

module.exports = router;