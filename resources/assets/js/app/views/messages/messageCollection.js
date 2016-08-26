var Marionette = require('backbone.marionette');
var messageItem = require('./messageItem');
var _ = require('underscore');

module.exports = Marionette.CollectionView.extend({
    childView: messageItem,
    childViewOptions : function (model) {
        return {
            user: _.findWhere(this.collection.getMeta().users_from, {id: model.get('user_from_id')})
        };
    }
});
