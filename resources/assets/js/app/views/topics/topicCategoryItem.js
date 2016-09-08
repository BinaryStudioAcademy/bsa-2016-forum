var Marionette = require('backbone.marionette');
var dateHelper = require('../../helpers/dateHelper');

module.exports = Marionette.ItemView.extend({
    template: 'topicCategoryItem',
    className: 'row post-item',
    tagName: 'div',

    serializeData: function () {
        var model = this.model.toJSON();
        for(var item in model.lastThreeTopics)
        {
            model.lastThreeTopics[item].updated_at = dateHelper.relativeDate(this.model.get('updated_at'))
        }
        return {
            model: model
        }

    }


});