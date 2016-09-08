var Marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = Marionette.CollectionView.extend({
    childView: require('./subscriptionsItem'),
    childViewContainer: 'div',
    tagName: 'div',
    childViewOptions : function (model) {
        var target = _.findWhere(
            this.collection.getMeta()[model.get('subscription_type')],
            {id: parseInt(model.get('subscription_id'))}
        );

        return {
            target: target
        };
    }
});