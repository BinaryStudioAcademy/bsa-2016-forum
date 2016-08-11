var Helper = require('../controllers/Helper.js');

Helper.templateCache('header-template', 'header.tpl');

module.exports = Marionette.ItemView.extend({
    template: '#header-template'
});