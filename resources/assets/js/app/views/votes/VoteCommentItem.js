var Marionette = require('backbone.marionette');
var moment = require('moment-timezone');

module.exports = Marionette.ItemView.extend({
    tagName: 'div',
    className: 'vote-comment',
    template: 'voteDetailComment',
    serializeData: function () {
        var id = this.model.get('id');
        return {
            model: this.model.toJSON(),
            createdDate: moment.utc(this.model.get('created_at')).tz('Europe/Kiev').format('DD.MM.YYYY HH:mm:ss'),
            meta: {
                user: this.model.getMeta()[id].user
            }
        };
    }
});