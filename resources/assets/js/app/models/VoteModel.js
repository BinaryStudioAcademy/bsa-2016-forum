var BaseModel = require('../instances/Model');
var _ = require('underscore');
var moment = require('moment');

module.exports = BaseModel.extend({
    urlRoot: '/votes',
    validate: function (attrs) {
        var errors = {};
        if(!attrs.title || attrs.title == ' ')
            errors.title = 'Write question title!';
        
        if(attrs.finished_at == 'Invalid date')
            errors.invalidDate = true;
        else if(moment().isAfter(attrs.finished_at))
            errors.finishInThePast = true;


        if(!_.isEmpty(errors))
            return errors;
    },
    dateFormats: [
        //full
        'DD:MM:YYYY HH:mm:ss',
        'DD/MM/YYYY HH/mm/ss',
        'DD-MM-YYYY HH-mm-ss',

        //short dates
        'D:M:YY HH:mm:ss',
        'D/M/YY HH/mm/ss',
        'D-M-YY HH-mm-ss',

        //short times
        'DD:MM:YYYY H:m:s',
        'DD/MM/YYYY H/m/s',
        'DD-MM-YYYY H-m-s',

        //short
        'D:M:YY H:m:s',
        'D/M/YY H/m/s',
        'D-M-YY H-m-s'
    ]
});