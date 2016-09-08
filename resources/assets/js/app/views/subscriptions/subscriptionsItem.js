var _ = require('underscore');
var Marionette = require('backbone.marionette');
var currentUser = require('../../initializers/currentUser');

module.exports = Marionette.ItemView.extend({
    template: 'subscriptionItem',
    tagName: 'div',
    ui: {
        delete: '.delete-subscription-button'
    },
    events: {
        'click @ui.delete': 'delete'
    },
    serializeData: function () {
        var target = {};
        target.id = this.model.get('subscription_id');
        switch (this.model.get('subscription_type')) {
            case 'Topic':
                target.title = this.options.target.name;
                target.type = 'topics';
                break;
            case 'Vote':
                target.title = this.options.target.title;
                target.type = 'votes';
                break;
        }

        return {
            model: this.model.toJSON(),
            target: target
        };
    },
    delete: function () {
        this.model.parentUrl = _.result(currentUser, 'url');
        this.model.destroy();
    }
});