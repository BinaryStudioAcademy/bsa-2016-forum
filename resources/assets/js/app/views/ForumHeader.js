var Helper = require('../controllers/Helper.js');

Helper.templateCache('forum-header-template', 'ForumHeader.tpl');

module.exports = Marionette.ItemView.extend({
    template: '#forum-header-template'
});