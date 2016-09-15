var Marionette = require('backbone.marionette');
require('corejs-typeahead');
var logger = require('../../instances/logger');
var messageCollection = require('./messageCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'messageLayout',
    regions: {
        container: '#users-messages'
    },
    ui: {
        userSearch: '#typeahead'
    },
    onRender: function () {
        this.ui.userSearch.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                source: this.searchUsers(this),
                templates: {
                    suggestion: Marionette.TemplateCache.get('userSelect')
                },
                displayKey: function (obj) {
                    // console.log('obj', obj);
                    return obj.first_name + ' ' + obj.last_name;
                }
            });
        this.container.show(new messageCollection({
            collection: this.collection
        }));
    },
    searchUsers: function(view) {
        return function (q, sync, async) {
            // console.log(view);
            view.options.users.fetch({
                data: {
                    query: q,
                    limit: 5
                },
                success: function (collection) {
                    async(collection.toJSON());
                }
            });
        }
    }

});

