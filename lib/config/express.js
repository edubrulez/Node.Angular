/**
 * Module dependencies.
 */

var express = require('express'),
    path = require('path'),
    mongoStore = require('connect-mongo')(express),
    flash = require('connect-flash');
    //, helpers = require('view-helpers');

module.exports = function (app, config, passport, rootDir) {

    app.set('showStackError', true);
    // should be placed before express.static
    app.use(express.compress({
        filter: function (req, res) {
            return /json|text|javascript|css/.test(res.getHeader('Content-Type'));
        },
        level: 9
    }));
    //app.use(express.favicon());
    //app.use(express.static(config.root + '/public'));

    // don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(express.logger('dev'));
    }

    // set views path, template engine and default layout
    app.set('view engine', 'html');


// Express Configuration
    app.configure('development', function(){
        app.use(require('connect-livereload')());
        app.use(express.static(path.join(rootDir, '.tmp')));
        app.use(express.static(path.join(rootDir, 'app')));
        app.use(express.errorHandler());
        console.log(rootDir);
        app.set('views', rootDir + '/app/views');
    });

    app.configure('production', function(){
        app.use(express.favicon(path.join(rootDir, 'public', 'favicon.ico')));
        app.use(express.static(path.join(rootDir, 'public')));
        app.set('views', rootDir + '/views');
    });

    app.configure(function () {
        app.engine('html', require('ejs').renderFile);

        // dynamic helpers
        //app.use(helpers(config.app.name));

        // cookieParser should be above session
        app.use(express.cookieParser());

        // bodyParser should be above methodOverride
        app.use(express.bodyParser());
        app.use(express.methodOverride());

        // express/mongo session storage
        app.use(express.session({
            secret: 'Bada Bing',
            store: new mongoStore({
                url: config.sessionDb,
                collection : 'sessions'
            })
        }));

        // connect flash for flash messages
        app.use(flash());

        // use passport session
        app.use(passport.initialize());
        app.use(passport.session());

        // routes should be at the last
        app.use(app.router);

        // assume "not found" in the error msgs
        // is a 404. this is somewhat silly, but
        // valid, you can do whatever you like, set
        // properties, use instanceof etc.
        app.use(function(err, req, res, next){
            // treat as 404
            if (~err.message.indexOf('not found')) return next()

            // log it
            console.error(err.stack)

            // error page
            res.status(500).render('500', { error: err.stack })
        });

        // assume 404 since no middleware responded
        app.use(function(req, res, next){
            res.status(404).render('404', { url: req.originalUrl, error: 'Not found' })
        });

    })
}