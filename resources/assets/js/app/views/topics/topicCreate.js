var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var TopicModel = require('../../models/TopicModel');
var currentUser = require('../../initializers/currentUser');
var topicCategoryCollectionForSelector = require('../../views/topics/topicCategoryCollectionForSelector');
var topicCategoryItemForSelector = require('../../views/topics/topicCategoryItemForSelector');
var markdownHelp = require('../../views/modalWindows/markdownHelp');
var app = require('../../instances/appInstance');
var TopicCreateHeader = require('../../views/topics/topicCreateHeader');

module.exports = Marionette.LayoutView.extend({
    template: 'topicCreateNew',

    ui: {
        createForm: '.topic-form',
        tagsInput: '.tags',
        openMarkdownHelp: '.openMarkdownHelp'
    },

    initialize: function (options) {
        this.tags = options.tags;
        this.model.set({user_id: currentUser.id});
    },

    regions: {
        categories: '#categories',
        topicCreateHeader: '.topic-new-head'
    },

    onBeforeShow: function () {
        this.getRegion('categories').show(new topicCategoryItemForSelector({
            collection: this.collection,
            model: this.model
        }));

        this.getRegion('topicCreateHeader').show(new TopicCreateHeader({
            model: this.model,
            tags: this.tags
        }))
    },
    
    modelEvents: {
        'invalid': function (model, errors, options) {
            this.$('.errors').empty();
            for (var error in errors) {
                this.$('[name="' + error + '"]').siblings('.errors').html(errors[error]);
            }
        }
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