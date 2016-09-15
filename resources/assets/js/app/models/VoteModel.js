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
        if (!attrs.title || attrs.title.trim().length == 0)
            errors['title'] = 'Title field is required';
        if (!_.isEmpty(attrs.finished_at) && DateHelper.getDateTimeDiff(attrs.finished_at) > -this.minTime) {
            errors['finished_at'] = 'Perhaps, you typed date in the past. Also, minimum time for vote: ' + this.minTime + ' minutes.';
        }

        if (!_.isEmpty(errors))
            return errors;
    },
    defaults: {
        description: '',
        is_saved: 0,
        is_public: true,
        is_single: true,
        finished_at: ''
    },
    
    isFinished: function () {
        return DateHelper.isTimePassed(this.finished_at); 
    }
});