var UserModel = require('../models/UserModel');

var currentUser = new UserModel({id: 2});

currentUser.fetch();

module.exports = currentUser;