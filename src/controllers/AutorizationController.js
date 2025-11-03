const User = require('../models/User');
const bcrypt = require('bcrypt');

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
        User.findOne({ email }).then((user) => {
            if (user) {
                const isPasswordValid = bcrypt.compareSync(password, user.password);

                if (!isPasswordValid) {
                    throw new Error('Neteisingas el. paštas arba slaptažodis');
                }
                // Pradedame sesiją - išsaugome vartotojo ID (Tai reiškia, kad vartotojas yra prisijungęs)
                req.session.userId = user._id;
                // ir pereiname į pagrindinį puslapį
                res.redirect('/');
            } else {
                throw new Error('Neteisingas el. paštas arba slaptažodis');
            }
        }).catch((err) => {
            console.log(err);
            // jei nepavyko prisijungti, pereiname į prisijungimo puslapį
            res.status(400).render('login', {
                title: 'Login',
                activePage: 'login',
                error: err.message
            });
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
            let KlaidosPranesimas = err.message;

            if (err.code === 11000) {
                KlaidosPranesimas = 'Vartotojas su tokiu el. paštu jau egzistuoja';
            }
            if (err.name === 'ValidationError') {
                KlaidosPranesimas = 'Neteisingi duomenys';
            }
            
            res.status(400).render(
                'register',
                {
                    title: 'Register',
                    activePage: 'register',
                    error: KlaidosPranesimas
                }
            );
        });
    }
}

module.exports = AutorizationController;
