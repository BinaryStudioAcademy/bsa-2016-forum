var Marionette = require('backbone.marionette');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var Helper = require('../../helpers/helper');

module.exports = Marionette.ItemView.extend({
    template: 'voteSummary',
    modelEvents: {
        'sync': 'render'
    },

    ui: {
        saveSummary: '#summary-save-btn'
    },

    events: {
        'click @ui.saveSummary': 'saveSummary'
    },

    saveSummary: function () {
        var self = this;
        this.model.set('summary', this.$('#summary').val());
        this.model.set('user_id', currentUser.get('id'));
        this.model.save({}, {
            validate: false
        });

    },

    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var meta = {
            user: {},
            likes: {},
            comments: {},
            tags: {}
        };
        if (tempmeta) {
            var id = this.model.get('id');

            meta = {
                isFinished: ((this.model.get('finished_at') == null) || (dateHelper.getDateTimeDiff(this.model.get('finished_at')) < 0)),
                finishedDate: (this.model.get('finished_at') != null) ? dateHelper.middleDate(this.model.get('finished_at')) : '',
                userIsAdminOrTS: currentUser.isAdmin() || (currentUser.get('id') === this.model.get('user_id')),
                summaryFormatted: Helper.nl2br(this.model.get('summary'))
            }
        }

        return {
            model: this.model.toJSON(),
            meta: meta
        };
    }
});