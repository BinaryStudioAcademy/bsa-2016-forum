var Backbone = require('backbone');
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
    },
    defaults: {
        is_saved: 0,
        is_public: true,
        is_single: true
    },
    sync: function (method, model, options) {
        
        if(method == 'create' || method == 'update') {
            model.set({users: JSON.stringify(model.get('users'))});
            model.set({tags: JSON.stringify(model.get('tags'))});
        }

        if (!options.url) {
            options.url = this._getRequestUrl(model);
        }

        if (!options.statusCode) options.statusCode = {};
        options.statusCode['400'] = function (xhr, textStatus, errorThrown) {
            if (xhr.responseJSON) {
                model.validationError = xhr.responseJSON;
                model.trigger('invalid', model, model.validationError);
            }
        };
        return Backbone.sync(method, model, options);
    }
});