var BaseModel = require('../instances/Model');
var _ = require('underscore');
var moment = require('moment');

module.exports = BaseModel.extend({
    urlRoot: '/votes',
    validate: function (attrs) {
        var errors = {};
        if(!attrs.title || attrs.title == ' ')
            errors['title'] = 'Write question title!';

        if(attrs.finished_at == 'Invalid date')
            errors['invalidDate'] = true;
        else if(moment().diff(moment(attrs.finished_at, "YYYY-MM-DD HH:mm:ss"), 'minute') > -5) {
            errors['dateInPast'] = '<span> Minimum time for vote: 5 minutes.</span>';
        }
        
        if(!_.isEmpty(errors))
            return errors;
    }
});