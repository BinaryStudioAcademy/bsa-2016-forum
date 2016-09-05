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
        if (!attrs.title || attrs.title == ' ')
            errors['title'] = 'Write question title!';
        if (!_.isEmpty(attrs.finished_at) && this.minTime > 0 && moment().diff(DateHelper.dateWithoutTimezone(attrs.finished_at), 'minute') > -this.minTime) {
            errors['dateInPast'] = 'Perhabs, you typed date in the past. Also, minimum time for vote: ' + this.minTime + ' minutes.';
        }

        if (!_.isEmpty(errors))
            return errors;
    },
    defaults: {
        is_saved: 0,
        is_public: true,
        is_single: true,
        finished_at: ''
    }
});