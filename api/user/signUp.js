const {Router} = require('express');
const { StatusCodes } = require('http-status-codes');
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = Router();

router.post("/", async (req, res) => {
    try {
        const {username, password, name, surname } = req.body;

        if (!(username && password)) {
            res.sendStatus(StatusCodes.BAD_REQUEST);
            return;
        }

        const existingUser = await db('Users').where('username', req.body.username).first();
        
        if (existingUser) {
            res.sendStatus(StatusCodes.BAD_REQUEST);
            return;
        }

        const encPassword = await bcrypt.hash(password, 10);

        await db('Users').insert(username, encPassword);

        const token = jwt.sign(
            {id: user._id, username: user.username},
            'long_long_impossible_to_guess_and_very_secure_random_secret',
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
            username: `${user.username}`,
        });
        
    } catch (e) {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        console.log(e);
    }
});

module.exports = router;