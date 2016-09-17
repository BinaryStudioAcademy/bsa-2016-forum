var _ = require('underscore');
var Marionette = require('backbone.marionette');
var currentUser = require('../../initializers/currentUser');
var ConfirmDeleteView = require('./subscriptionsConfirmDeleteView');
var app = require('../../instances/appInstance');

module.exports = Marionette.ItemView.extend({
    template: 'subscriptionItem',
    tagName: 'li',
    ui: {
        delete: '.delete-subscription-button'
    },
    events: {
        'click @ui.delete': 'delete'
    },
    serializeData: function () {
        var url = "", title = "";
        var vote_slug = (this.options.target.slug && this.options.target.slug !== undefined) ? this.options.target.slug : this.options.target.id;

        switch (this.model.get('subscription_type')) {
            case 'Topic':
                title = this.options.target.name;
                url = '#topics/'+this.options.target.slug;
                break;
            case 'Vote':
                title = this.options.target.title;
                url = '#votes/'+ vote_slug
                break;
        }

        return {
            model: this.model.toJSON(),
            url: url,
            title: title
        };
    },
    delete: function () {
        this.model.parentUrl = _.result(currentUser, 'url');

        app.renderModal(new ConfirmDeleteView({
            model: this.model,
            meta: this.options.target
        }));
    }
});