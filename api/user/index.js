const {Router} = require('express');
// const jwtExist = require('./jwtExist');
const signIn = require('./signIn');
const signUp = require('./signUp');
// const logout = require('./logout');
const router = Router();

// router.use('/jwtExist', jwtExist);
router.use('/signIn', signIn);
router.use('/signUp', signUp);
// router.use('/logout', logout);

module.exports = router;