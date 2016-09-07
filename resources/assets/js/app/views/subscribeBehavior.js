var _ = require("underscore");
var Marionette = require('backbone.marionette');
var Subscription = require('../models/SubscriptionModel');
var logger = require('../instances/logger');
module.exports = Marionette.Behavior.extend({

    defaults: {
        "target_type": undefined,
        "parent_url": ""
    },

    events: {
       'click @ui.subscribeNotification': 'subscribe'
    },

    onRender: function () {
        var meta = this.view.model.getMeta();
        if(!_.isUndefined(meta)) {
            if (!_.isNull(meta[this.view.model.get('id')].subscription))
                this.addOkIcon();
        }
    },

    unlockButton: function () {
        this.ui.subscribeNotification.removeAttr('disabled');
        this.ui.subscribeNotification.addClass('text-info');
        this.ui.subscribeNotification.removeClass('text-muted');
    },

    lockButton: function () {
        this.ui.subscribeNotification.attr('disabled', 'disabled');
        this.ui.subscribeNotification.removeClass('text-info');
        this.ui.subscribeNotification.addClass('text-muted');
    },

    addOkIcon: function () {
        this.ui.subscribeNotification.append(' <i class="glyphicon glyphicon-ok subscribed"></i>');
    },

    removeOkIcon: function () {
        this.ui.subscribeNotification.children('.subscribed').remove();
    },

    saveSubscribe: function(subscribe)
    {
        this.view.model.getMeta()[this.view.model.get('id')].subscription = subscribe;
    },

    getSubscribe: function () {
        var model = this.view.model;
        if (_.isUndefined(model.getMeta()[model.get('id')].subscription) || _.isNull(model.getMeta()[model.get('id')].subscription)) {
            return undefined;
        } else {
            return model.getMeta()[model.get('id')].subscription;
        }
    },

    subscribe: function() {
        var subscription = new Subscription();
        subscription.parentUrl = this.options.parent_url;
        this.lockButton(this.ui.subscribeNotification);

        var that = this;
        var view = this.view;

        var subscription_meta = that.getSubscribe();

        if (subscription_meta) {
            subscription.set({
                id: subscription_meta.id
            });
            subscription.destroy({
                success: function () {
                    that.unlockButton(that.ui.subscribeNotification);
                    that.removeOkIcon();
                    that.saveSubscribe(undefined);
                },
                error: function (response, xhr) {
                    var errorMsg = '';
                    $.each(xhr.responseJSON, function (index, value) {
                        errorMsg += index + ': ' + value;
                    });

                    logger(errorMsg);
                }
            });

        } else {
            subscription.save({
                subscription_id: view.model.id,
                subscription_type: that.options.target_type
            }, {
                success: function (response) {
                    that.saveSubscribe(response);
                    that.unlockButton();
                    that.addOkIcon();
                },
                error: function (response, xhr) {
                    var errorMsg = '';
                    $.each(xhr.responseJSON, function (index, value) {
                        errorMsg += index + ': ' + value;
                    });
                    logger(errorMsg);
                }
            });
        }
    }
});