const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // Pradinės reikšmės
    res.locals.userId = null;
    res.locals.userInitials = null;
    console.log(req.session.user);
    // Jei vartotojas prisijungęs
    if (req.session.user) {
        try {
            const user = await User.findById(req.session.user._id);
            if (user) {
                res.locals.userId = req.session.user._id;
                // Sukuriame inicialus iš vardo ir pavardės
                res.locals.userInitials = (user.firstName.charAt(0) + user.lastName.charAt(0)).toUpperCase();
                if(user.role === 'admin') {
                    res.locals.isAdmin = true;
                }
            }

        } catch (err) {
            console.log('Klaida gaunant vartotojo duomenis:', err);
        }
    }
    
    next();
};

module.exports = authMiddleware;
