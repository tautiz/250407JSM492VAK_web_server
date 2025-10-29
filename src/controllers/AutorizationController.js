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

console.log(req.body);
        
        // User.findOne({ email, password }).then((user) => {
        //     if (user) {
        //         // req.ses
        //         // 
        //         sion.userId = user._id;
        //         // res.redirect('/');
        //     } else {
        //         res.redirect('/login');
        //     }
        // }).catch((err) => {
        //     console.log(err);
        // })
    }
}

module.exports = AutorizationController;
