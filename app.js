const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const Post = require('./src/models/Post');
const User = require('./src/models/User');
const BlogController = require('./src/controllers/BlogController');
const AboutController = require('./src/controllers/AboutController');
const HomePageController = require('./src/controllers/HomePageController');
const homePageController = new HomePageController();
const AutorizationController = require('./src/controllers/AutorizationController');
const autorizationController = new AutorizationController();
const authMiddleware = require('./src/middlewares/auth');
const HttpLogger = require('./src/middlewares/httpLogger');
const cookieParser = require('cookie-parser');
const cors = require('./src/middlewares/cors');

const app = express();
const PORT = process.env.PORT || 80;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'labai slaptas raktas',
    resave: false,
    saveUninitialized: false
}));

// app.use(cors());
app.use(cookieParser());

app.use(HttpLogger);

// // Middleware - perduodame vartotojo duomenis į visus views
app.use(authMiddleware);

const dbURI= "mongodb://localhost:27017/klases_darbas";
mongoose.connect(dbURI).then(() => {
    console.log('Sėkmingai prisijungėm prie DB');
}).catch((err) => {
    console.log('Nepavyko prisijungti prie DB', err);
});
 

app.get('/', homePageController.homePage);
app.get('/apie', AboutController.aboutPage);
app.get('/apie-mus', (req, res) => {res.redirect('/apie')});
app.get('/news', cors, BlogController.getPosts);
app.get('/blog/:id', BlogController.getPostById);
app.get('/blog/s/:slug', BlogController.getPostBySlug);

app.get('/login', autorizationController.loginPage);
app.get('/register', autorizationController.registerPage);
app.post('/login', autorizationController.login);
app.post('/register', autorizationController.register);
app.get('/logout', autorizationController.logout);

// app.get('/admin', autorizeMiddleware, adminController.adminPage);















app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Puslapis nerastas',
        activePage: null
    });
});

app.listen(PORT, () => {
    console.log(`NovaWave serveris veikia adresu http://localhost:${PORT}`);
});