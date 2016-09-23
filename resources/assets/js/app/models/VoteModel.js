var Backbone = require('backbone');
var BaseModel = require('../instances/Model');
var _ = require('underscore');
var moment = require('moment');
var DateHelper = require('../helpers/dateHelper.js');

module.exports = BaseModel.extend({
    urlRoot: '/votes',
    minTime: 5,
    validate: function (attrs) {
        var errors = {};
        var back_date_false = true;

        if (attrs.back_date){
           back_date_false = false;
        }

        if (_.isEmpty(attrs.title) || attrs.title.trim().length == 0)
            errors['title'] = 'Title field is required';
        if (back_date_false && (!_.isEmpty(attrs.finished_at) && DateHelper.getDateTimeDiff(attrs.finished_at) > -this.minTime)) {
            errors['finished_at'] = 'Perhaps, you typed date in the past. Also, minimum time for vote: ' + this.minTime + ' minutes.';
        }

        if (!_.isEmpty(errors))
        {
            return errors;
        } else {
            this.trigger('valid');
        }

    },
    defaults: {
        description: '',
        is_saved: 0,
        is_public: true,
        is_single: true,
        finished_at: null,
        title: ''
    },
    vote_slug : function () {
        return (this.get("slug") && this.get("slug") !== undefined) ? this.get("slug") : this.get("id");
    },
    
    initialize: function() {
        this.bind('notFound', this.notFound)
    },
    
    notFound: function () {
        Backbone.history.navigate('votes', {trigger: true});
    },

    fetchBySlag: function () {
        var url = _.result(this, '_getRequestUrl') + '/' + this.get('slug');
        return this.fetch({url: url});
    }
});