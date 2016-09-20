var Marionette = require('backbone.marionette');
var _ = require('underscore');

module.exports = Marionette.CollectionView.extend({
    childView: require('./subscriptionsItem'),
    tagName: 'ul',
    className: 'news-items',
    emptyView: require('./subscriptionsEmptyItem'),

    childViewOptions : function (model) {
        if(!_.isUndefined(this.collection.getMeta()))
        {
            return {
                target:  _.findWhere(
                    this.collection.getMeta()[model.get('subscription_type')],
                    {id: parseInt(model.get('subscription_id'))})
            };
        }
    }
});