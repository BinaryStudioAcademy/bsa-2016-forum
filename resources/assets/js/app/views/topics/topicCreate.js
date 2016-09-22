var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var TopicModel = require('../../models/TopicModel');
var currentUser = require('../../initializers/currentUser');
var topicCategoryCollectionForSelector = require('../../views/topics/topicCategoryCollectionForSelector');
var topicCategoryItemForSelector = require('../../views/topics/topicCategoryItemForSelector');
var markdownHelp = require('../../views/modalWindows/markdownHelp');
var app = require('../../instances/appInstance');

module.exports = Marionette.ItemView.extend({
    template: 'topicCreateNew',

    ui: {
        createForm: '.topic-form',
        openMarkdownHelp: '.openMarkdownHelp'
    },

    initialize: function () {
        this.model.set({user_id: currentUser.id});
    },
    regions: {
        categories: '#categories'
    },

    onBeforeShow: function () {
        this.getRegion('categories').show(new topicCategoryItemForSelector({
            collection: this.collection,
            topicModel: this.model
        }));
    },
    
    modelEvents: {
        'invalid': function (model, errors, options) {
            this.$('.errors').empty();
            for (var error in errors) {
                this.$('[name="' + error + '"]').siblings('.errors').html(errors[error]);
            }
        },
        'sync': 'render'
    },

    events: {
        'change @ui.createForm': function (e) {
            var updateModel = {};
            var value = e.target.value;
            var attr = e.target.name;
            updateModel[attr] = value;
            this.model.set(updateModel);
        },
        'click @ui.openMarkdownHelp': function () {
            app.renderModal(new markdownHelp());
        },
        'submit @ui.createForm': function (e) {
            e.preventDefault();
            this.model.save({}, {
                success: function (model, response) {
                    Backbone.history.navigate('topics/' + model.get('slug'), {trigger: true});
                }
            });
        }
    }

});