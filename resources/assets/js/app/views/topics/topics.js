var Helper = require('../../controllers/Helper.js');

Helper.templateCache('topics-template', 'topics.tpl');

module.exports = Marionette.ItemView.extend({
    template: '#topics-template'
});