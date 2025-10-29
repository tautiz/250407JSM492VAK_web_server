const Post = require('../models/Post');

class HomePageController {
    homePage(req, res) {
        const postCount = req.query.limit || 2;

        Post.find().limit(postCount).then((posts) => {
            res.render('index', {
                title: 'Pagrindinis',
                vardas: 'Tautvydas',
                activePage: 'home',
                latestPosts: posts
            }); 
        });
    }
}

module.exports = HomePageController;
