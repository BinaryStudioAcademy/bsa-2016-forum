var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');
var Radio = require('backbone.radio');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template: 'subscriptionConfirmDelete',
    ui: {
        yes: '#subscribe-cancel-btn'
    },
    events: {
        'click @ui.yes': 'cancelSubscribe'
    },

    cancelSubscribe: function () {
        Radio.channel('subscriptionChannel').trigger('cancel', this.model);
        this.$('.modal').modal('hide');
    },

    onRender: function () {
        var view = this;
        this.$('.modal').modal('show');
        this.$('.modal').on('hidden.bs.modal', function (e) {
            view.destroy();
        });
    },
        
    serializeData: function () {
        var url = "", title = "";
        var meta = this.options.meta;
        
        switch (this.model.get('subscription_type')) {
            case 'Topic':
                title = meta.name;
                url = '#topics/'+meta.slug;
                break;
            case 'Vote':
                title = meta.title;
                url = '#votes/'+meta.id;
                break;
        }

        return {
            url: url,
            title: title
        };
    }
});