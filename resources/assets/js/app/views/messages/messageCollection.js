var Marionette = require('backbone.marionette');
var messageItem = require('./messageItem');
var _ = require('underscore');

module.exports = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'messages_layout',
    childView: messageItem,
    childViewOptions : function (model) {
        var user, isUserFrom;
        var userFrom = _.findWhere(this.collection.getMeta().users, {id: parseInt(model.get('user_from_id'))});
        var userTo = _.findWhere(this.collection.getMeta().users, {id: parseInt(model.get('user_to_id'))});
        if (userFrom) {
            user = userFrom;
            isUserFrom = true;
        } else {
            user = userTo;
            isUserFrom = false;
        }
        return {
            user: user,
            isUserFrom: isUserFrom
        };
    }
});
