var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'topicCategoryItem',
    className: 'row post-item',
    tagName: 'div',

    serializeData: function () {
        var tempmeta = this.model.getMeta();
        var id = this.model.get('id');
        var meta = {};
        meta.topicCount = tempmeta[id].topicCount;
        meta.lastThreeTopics = tempmeta[id].lastThreeTopics;
        var model = this.model.toJSON();
        for(var item in meta.lastThreeTopics)
        {
            meta.lastThreeTopics[item].updated_at = dateHelper.relativeDate(meta.lastThreeTopics[item].updated_at)
        }
        return {
            model: model,
            meta: meta
        }

    }


});