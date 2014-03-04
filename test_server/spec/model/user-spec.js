var mongoose = require('mongoose');
//noinspection SpellCheckingInspection
var mockgoose = require('mockgoose');
var User = require('../../../lib/models/user');

mockgoose(mongoose);

describe('when creating a user', function () {
    afterEach(function () {
       mockgoose.reset('user');
    });

    describe ('then saving the user', function () {
        var userModel;

        beforeEach(function() {
            userModel = new User();
            userModel.username = 'testuser';
            userModel.password = 'asdf';
        });

        it('should save to the database without error', function() {
            userModel.save(function(err) {
                expect(err).toBeNull();

                User.find(function(err, result) {
                    expect(result.length).toBe(1);
                    expect(result[0].username).toBe(userModel.username);
                });
            });
        });

        it('should hash the password', function() {
            userModel.save(function(err) {
                expect(err).toBeNull();

                User.find(function(err, result) {
                    expect(result[0].password).not.toBe(userModel.password);
                });
            });
        });
     });
});

describe('when comparing a password to its hash', function () {
    var userModel;

    beforeEach(function() {
        userModel = new User();
        userModel.username = 'testuser';
        userModel.password = 'asdf';
    });

    afterEach(function () {
        mockgoose.reset('user');
    });

    it('should positively compare the correct password', function() {
        userModel.save(function(err) {
            expect(err).toBeNull();

            User.find(function(err, result) {
                expect(result[0].comparePassword('asdf')).toBe(true);
            });
        });
    });

    it('should negatively compare the incorrect password', function() {
        userModel.save(function(err) {
            expect(err).toBeNull();

            User.find(function(err, result) {
                expect(result[0].comparePassword('1234')).toBe(false);
            });
        });
    });
});