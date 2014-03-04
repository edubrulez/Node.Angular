'use strict';

var //mongoose = require('mongoose'),
    User = require('../models/user'),
    async = require('async');

exports.registerUser = function(req, res) {
    var userModel;
    userModel = new User();

    userModel.email = req.body.user.email;
    userModel.password = req.body.user.password;
    userModel.username = req.body.user.username;

    return userModel.save(function (err) {
        if (!err)
        {
            $location.url('/login');
        }

        return res.send(err);
    })
};
