exports.aboutPage = (request, response) => {
    response.render('about', {
        title: 'Apie mus',
        activePage: 'about'
    });
};