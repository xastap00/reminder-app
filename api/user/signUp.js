const {Router} = require('express');
const { StatusCodes } = require('http-status-codes');
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = Router();

router.post("/", async (req, res) => {
    try {
        console.log(req.body);
        const {username, password } = req.body;

        if (!(username && password)) {
            res.sendStatus(StatusCodes.BAD_REQUEST);
            return;
        }

        const existingUser = await db('Users').where('username', username).first();
        
        if (existingUser) {
            res.sendStatus(StatusCodes.BAD_REQUEST);
            return;
        }

        const encPassword = await bcrypt.hash(password, 10);

        await db('Users').insert({username, password: encPassword});

        const token = jwt.sign(
            {username: username},
            process.env.SECRET_KEY,
            {
                expiresIn: '2 hours'
            }
        );

        const cookieOpts = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

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