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
        const Notes = await (
            db('Notes').where('username', '=', jwt.username).select('*')
        );
        res.json(Notes);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        console.log(e);
    }
});

module.exports = router;