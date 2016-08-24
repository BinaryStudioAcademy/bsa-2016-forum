var Marionette = require('backbone.marionette');
var messageItem = require('./messageItem');

module.exports = Marionette.CollectionView.extend({
    childView: messageItem,
    childViewOptions : function (model) {
        var user = this.collection.getMeta().users_from.filter(function (user) {
            return user.id == model.get('user_from_id');
        })[0];
        
        return {
            user: user
        };
    }
});
