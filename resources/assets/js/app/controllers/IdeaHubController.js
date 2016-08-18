var app = require('../instances/appInstance');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var VoteModel = require('../models/VoteModel');
var ListVotes = require('../views/votes/ListVotes');

var CommentsCollection = require('../collections/commentCollection');
var CommentModel = require('../models/CommentModel');
var ShowVote = require('../views/votes/ShowVote');

var Radio = require('backbone.radio');
var Votes = require('../instances/Votes');
module.exports = Marionette.Object.extend({
    initialize: function () {
        this.listenTo(Radio.channel('votesChannel'), 'showVote', function (id) {
            Backbone.history.navigate('votes/' + id, {
                trigger: true
            });
        });

        this.listenTo(Radio.channel('votesChannel'), 'storeComment', function (view) {
            var model = new CommentModel({parentUrl: '/votes/' + view.parentId});
            model.set('user_id', 2);
            model.set('rating', 0);
            model.save({content_origin: view.ui.text.val()}, {
                success: function (data) {
                    //view.collection.fetch();
                    view.collection.add(data);
                    view.ui.text.val('');
                    Radio.trigger('votesChannel', 'clearAddView');
                }
            });
        });
    },
    index: function () {

        Votes.reset();
        var view = new ListVotes({vc: Votes});
        app.render(view);
        Votes.fetch();
    },
    showVote: function (id) {
        var model = new VoteModel();
        var myCommentsCollection = new CommentsCollection([], {parentUrl: '/votes/' + id});
        myCommentsCollection.fetch();

        if (Votes.get(id)) {
            model = Votes.get(id);
            app.render(new ShowVote({
                model: model,
                collection: myCommentsCollection
            }));
        } else {
            model = new VoteModel({id: id});

            model.fetch({
                success: function (data) {
                    app.render(new ShowVote({
                        model: model,
                        collection: myCommentsCollection
                    }));
                }
            });

        }
    }
});