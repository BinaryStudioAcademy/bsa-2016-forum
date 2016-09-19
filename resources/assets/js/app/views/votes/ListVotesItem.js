var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var SubscribeBehavior = require('../../behaviors/subscribeBehavior');
var _ = require('underscore');
var currentUser = require('../../initializers/currentUser');
var dateHelper = require('../../helpers/dateHelper');
var UserAvatarView = require('../users/userAvatar');

//module.exports = Marionette.ItemView.extend({
module.exports = Marionette.LayoutView.extend({
    template: 'voteItem',
    tagName: 'li',
    
    attributes : function () {
        return {
            href: "#/votes/" + this.model.id
        }
    },
    
    ui: {
        subscribeNotification: '.subscribe-btn',
        avatar : '.avatar'
    },

    regions: {
        avatar: '@ui.avatar'
    },

    behaviors: {
        SubscribeBehavior: {
            behaviorClass: SubscribeBehavior,
            parent_url: _.result(currentUser, 'url'),
            target_type: 'Vote'
        }
    },

    serializeData: function () {    
        var meta = this.model.getMetaById() || {};
        return {
            model: this.model.toJSON(),
            isFinished: ((this.model.get('finished_at') == null) || (dateHelper.getDateTimeDiff(this.model.get('finished_at')) < 0)),
            createdDate: dateHelper.fullDate(this.model.get('created_at')),
            finishedDate: (this.model.get('finished_at') != null) ? dateHelper.middleDate(this.model.get('finished_at')) : '',
            meta: meta
        };
    },

    onRender: function(){
        this.getRegion('avatar').show(new UserAvatarView({
            model: this.model
        }));
    }

});