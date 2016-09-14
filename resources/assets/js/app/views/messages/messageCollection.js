var Marionette = require('backbone.marionette');
var messageItem = require('./messageItem');
var _ = require('underscore');

module.exports = Marionette.CollectionView.extend({
    childView: messageItem,
    childViewOptions : function (model) {
        return {
            userFrom: _.findWhere(this.collection.getMeta().users, {id: parseInt(model.get('user_from_id'))}),
            userTo: _.findWhere(this.collection.getMeta().users, {id: parseInt(model.get('user_to_id'))})
        };
    }
});
