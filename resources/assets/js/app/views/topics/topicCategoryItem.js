var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'topicCategoryItem',
    className: 'row post-item',
    tagName: 'div'
   
    
});