var UserModel = require('../models/UserModel');

var currentUserModel = UserModel.extend({
    url: '/user'
});

var currentUser = new currentUserModel();

currentUser.fetch();

module.exports = currentUser;