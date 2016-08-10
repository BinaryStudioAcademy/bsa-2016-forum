var Helper = require('../controllers/Helper.js');
var Marionette = require('backbone.marionette');

Helper.templateCache('forum-header-template', 'ForumHeader.tpl');

module.exports = Marionette.ItemView.extend({
    template: '#forum-header-template'
});