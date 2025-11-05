const jwt = require('jsonwebtoken');
const SECRET_KEY = 'labai slaptas raktas';
const expirationTime = '1h';
const User = require('../models/User');


const generateToken = (user_id) => {
    return jwt.sign({
        userId: user_id
    }, SECRET_KEY, {
        expiresIn: expirationTime
    }); 
}

const verifyToken = async (token) => {
    
    try {        
        const userId = getUserIDFromToken(token);

        const user = await User.findById(userId);

        if(!user){
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}

const getUserIDFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        return decodedToken.userId;
    } catch (error) {
        return 'Klaida verifikavant tokena';
    }
}

module.exports = {
    generateToken,
    verifyToken,
    getUserIDFromToken
}