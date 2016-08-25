var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var TopicModel = require('../../models/TopicModel');
var topicCategoryCollection = require('../../views/topics/topicCategoryCollection');
var topicCategoryItemForSelector = require('../../views/topics/topicCategoryItemForSelector');

module.exports = Marionette.LayoutView.extend({
  template: 'topicCreateNew',

  ui: {
    createForm: '.topic-form'
  },

  regions: {
    categories: '#categories'
  },

  onRender: function() {
    this.categories.show(new topicCategoryCollection({
      childView: topicCategoryItemForSelector,
      collection: this.collection
    }))},

  collectionEvents: {
    'sync': 'render',
    'add': 'render',
    'remove': 'render'
  },

  initialize: function (options) {
    this.model.set({user_id: 2});
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
    'submit @ui.createForm': function (e) {
      e.preventDefault();
      this.model.save({}, {
        success: function (model, response) {
          Backbone.history.navigate('topics/' + model.get('id'), {trigger: true});
        }
      });
    }
  }

});