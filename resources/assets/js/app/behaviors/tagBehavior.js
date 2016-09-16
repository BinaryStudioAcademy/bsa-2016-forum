var _ = require('underscore');
var Marionette = require('backbone.marionette');
require('jquery-ui-browserify');
require('bootstrap-tokenfield');

module.exports = Marionette.Behavior.extend({
    onRender: function () {
        var view = this.view;
        view.tags.on('sync', function (response, data) {
            view.ui.tagsInput.tokenfield({
                autocomplete: {
                    source: data.data,
                    delay: 100
                },
                showAutocompleteOnFocus: true
            });
            view.ui.tagsInput.on('tokenfield:createtoken', function (event) {
                var existingTokens = $(this).tokenfield('getTokens');
                _.each(existingTokens, function (token) {
                    if (token.value === event.attrs.value)
                        event.preventDefault();
                });
            });
        });
    }
});