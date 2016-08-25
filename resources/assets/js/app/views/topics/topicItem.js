var Marionette = require('backbone.marionette');
var moment = require('momentjs');

module.exports = Marionette.ItemView.extend({
    template: 'topicItem',
    className: 'row post-item',
    tagName: 'div',
    
    initialize: function () {
        this.model.attributes.created_at =
            moment(this.model.attributes.created_at).format('dd.MM.YYYY');
    }
});