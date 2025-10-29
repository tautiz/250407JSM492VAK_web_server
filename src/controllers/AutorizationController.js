const User = require('../models/User');

class AutorizationController {
    loginPage(req, res) {
        res.render('login', {
            title: 'Login',
            activePage: 'login'
        });
    }

    registerPage(req, res) {
        res.render('register', {
            title: 'Register',
            activePage: 'register'
        });
    }

    login(req, res) {
        const { email, password } = req.body;
        
        // Paprasta paieška duombazėje
        User.findOne({ email, password }).then((user) => {
            if (user) {
                // Pradedame sesiją - išsaugome vartotojo ID (Tai reiškia, kad vartotojas yra prisijungęs)
                req.session.userId = user._id;
                // ir pereiname į pagrindinį puslapį
                res.redirect('/');
            } else {
                res.redirect('/login');
            }
        }).catch((err) => {
            console.log(err);
            // jei nepavyko prisijungti, pereiname į prisijungimo puslapį
            res.redirect('/login');
        });
    }

    logout(req, res) {
        // Sunaikiname sesiją
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/login');
        });
    }

    register(req, res) {
        const { firstName, lastName, email, password } = req.body;
        
        // Sukuriame naują vartotojo objektą
        const newUser = new User({
            firstName,
            lastName,
            email,
            password
        });

        newUser.save().then(() => {
            // Po vartotojo sukūrimo duomenų bazėje, iškart prisijungiame
            req.session.userId = newUser._id;
            // ir pereiname į pagrindinį puslapį
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
            res.redirect('/register');
        });
    }
}

module.exports = AutorizationController;
