module.exports = function (app, passport, auth) {
    var users = require('../controllers/users'),
        api = require('../controllers/api'),
        registerUser = require('../controllers/register'),
        controllers = require('../controllers');

    app.get('/api/awesomeThings', api.awesomeThings);
    app.post('/api/register', registerUser.registerUser);
    //app.get('/api/images', controllers.images);
    //app.get('/api/users', auth, user.list);

    // user routes
    //app.get('/login', users.login);
    //app.get('/signup', users.signup);
    //app.get('/logout', users.logout);
    //app.post('/users', users.create);
    app.post('/users/session', function(req, res) {
        console.log(req.body);
        passport.authenticate('local', {failureRedirect: '/login', failureFlash: 'Invalid email or password.'});
        console.log('after authenticate');
    } , users.session);
    //app.get('/users/:userId', users.show);
    //app.get('/auth/facebook', passport.authenticate('facebook', { scope: [ 'email', 'user_about_me'], failureRedirect: '/login' }), users.signin);
    //app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), users.authCallback);
    //app.get('/auth/github', passport.authenticate('github', { failureRedirect: '/login' }), users.signin);
    //app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), users.authCallback);
    //app.get('/auth/twitter', passport.authenticate('twitter', { failureRedirect: '/login' }), users.signin);
    //app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), users.authCallback);
    //app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));
    //app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/' }));

    // authorization callback
    var authCallback = function(req, res, next){
        if (!req.isAuthenticated())
            res.send(401);
        else
            next();
    };
    // Angular Routes
    app.get('/partials/upload', passport.authenticate('local', {failureRedirect: '/partials/login', failureFlash: 'Invalid email or password.'}), controllers.partials)
    app.get('/partials/*', controllers.partials);
    app.get('/*', controllers.index);
    //app.get('/partials/upload', authCallback, controllers.partials);

    app.get('/api/')
}