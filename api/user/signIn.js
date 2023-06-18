const {Router} = require('express');
const { StatusCodes } = require('http-status-codes');
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = Router();

router.post("/", async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!(username && password)) {
            res.sendStatus(StatusCodes.BAD_REQUEST);
            return;
        }
        const user = await db('Users').where('username', username).first();
        
        if (!user) {
            res.sendStatus(StatusCodes.BAD_REQUEST);
            return;
        }
        if (!bcrypt.compareSync(password, user.password)) {
            res.sendStatus(StatusCodes.BAD_REQUEST);
            return;
        }
        const token = jwt.sign(
            {username: user.username},
            process.env.SECRET_KEY,
            {
                expiresIn: '2 hours'
            }
        );

        const cookieOpts = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            // httpOnly: true
        };

        res.status(StatusCodes.OK);
        res.cookie('token', token, cookieOpts)
            .json({
            username
        });

    } catch (e) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        console.log(e);
    }
});

module.exports = router;