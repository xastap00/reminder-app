const {Router} = require('express');
const { StatusCodes } = require('http-status-codes');
const db = require('../../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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