const Post = require('../models/Post');

exports.getPostBySlug = (request, response) => {
    Post.findOne({slug: request.params.slug}, 'title slug')
    .then((post) => {
        return response.render('post', {
            title: post.title,
            activePage: 'blog'
        });
    }).catch((err) => {
        return response.redirect('/404');
    });
}

exports.getPostById =  (uzklausa, atsakas) => {
    Post.findById(uzklausa.params.id)
    .then((post) => {        
        return atsakas.render('post', {
            title: post.title,
            activePage: 'blog',
            post: post
        });
    }).catch((err) => {
        return atsakas.redirect('/404');
    });
};

exports.getPosts = (uzklausa, atsakas) => {
    Post.find()
    .then((posts) => {
        // return atsakas.render('blog', {
        //     title: 'Blogas',
        //     activePage: 'blog',
        //     posts: posts
        // });
        return atsakas.json(posts);
    }).catch((err) => {
        return errorPage(response);
    });
};

const errorPage = (response) => {
    response.render('error', {
        title: 'Error',
        activePage: 'error',
        error: 'Page not found'
    });
}
