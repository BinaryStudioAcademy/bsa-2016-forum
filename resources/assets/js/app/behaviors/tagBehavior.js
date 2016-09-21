var _ = require('underscore');
var Marionette = require('backbone.marionette');
require('jquery-ui-browserify');
require('bootstrap-tokenfield');

module.exports = Marionette.Behavior.extend({
    onRender: function () {
        var that = this;
        that.view.tags.on('sync', function (response, data) {
            that.view.tagsData = data.data;
            that.tagHandler(that.view.tagsData);
        });
        if (that.view.tagsData != undefined)
            this.tagHandler(that.view.tagsData);
    },

    tagHandler: function (data) {
        var view = this.view;
        if (!data) data = [];
        var autocompleteTags = _.difference(data, view.ui.tagsInput.val().split(', '));
        view.ui.tagsInput.tokenfield({
            autocomplete: {
                source: autocompleteTags,
                delay: 100
            }
        });
        view.ui.tagsInput.on('tokenfield:createtoken', function (event) {
            var existingTokens = $(this).tokenfield('getTokens');
            _.each(existingTokens, function (token) {
                if (token.value === event.attrs.value)
                    event.preventDefault();
            });
        });

        view.ui.tagsInput.on('change', function (event) {
            autocompleteTags = _.difference(data, view.ui.tagsInput.val().split(', '));
            view.ui.tagsInput.data('bs.tokenfield').$input.autocomplete({source: autocompleteTags});
        });
    },

    onBeforeDestroy: function () {
        this.ui.tagsInput.tokenfield('destroy');
    }
});