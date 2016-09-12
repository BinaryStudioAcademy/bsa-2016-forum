var _ = require('underscore');
var Marionette = require('backbone.marionette');
var currentUser = require('../../initializers/currentUser');
var ConfirmDeleteView = require('./subscriptionsConfirmDeleteView');
var Radio = require('backbone.radio');
var app = require('../../instances/appInstance');

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
        var url = "", title = "";
        switch (this.model.get('subscription_type')) {
            case 'Topic':
                title = this.options.target.name;
                url = '#topics/'+this.options.target.slug;
                break;
            case 'Vote':
                title = this.options.target.title;
                url = '#votes/'+this.options.target.id;
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

        var modal = new ConfirmDeleteView({
            model: this.model
        });
        
        modal.listenTo(Radio.channel('subscriptionChannel'), 'cancel', function (subscription_model) {
            subscription_model.destroy({
                error: function (response, xhr) {
                    var errorMsg = '';
                    $.each(xhr.responseJSON, function (index, value) {
                        errorMsg += index + ': ' + value;
                    });

                    logger(errorMsg);
                }
            });
        });

        app.renderModal(modal);
    }
});