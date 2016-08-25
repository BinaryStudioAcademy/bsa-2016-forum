var UserModel = require('../models/UserModel');
var user = new UserModel({ id: 2 });
user.fetch();

module.exports = user;