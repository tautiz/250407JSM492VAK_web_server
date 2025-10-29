const Post = require('../models/Post');

class HomePageController {
    homePage(req, res) {
        Post.find().sort({ date: -1 }).limit(3).then((posts) => {
            res.render('index', {
                title: 'Pagrindinis',
                vardas: 'Tautvydas',
                activePage: 'home',
                latestPosts: posts
                // userId ir userInitials dabar perduodami per middleware
            }); 
        });
    }
}

module.exports = HomePageController;
