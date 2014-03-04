'use strict';

var mongoose = require('mongoose'),
    Image = mongoose.model('Image'),
    async = require('async');

exports.getImages = function(request, response) {
    return Image.find(function(err, images) {
        if (!err) {
            return resposne.json(images);
        } else {
            return response.send(err);
        }
    });
};
