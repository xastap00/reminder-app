const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = (authHeader) => {
    const arr = authHeader.split(' ');
    if(arr.length != 2) {
        return null;
    } 
    try {
        return jwt.verify(arr[1], process.env.SECRET_KEY);
    } catch(e) {
        return null;
    }
};

module.exports = verify;