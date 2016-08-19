var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');

var VoteModel = require('../models/VoteModel');
var CommentModel = require('../models/CommentModel');

var CommentsCollection = require('../collections/commentCollection');

var ListVotes = require('../views/votes/ListVotes');
var ShowVote = require('../views/votes/ShowVote');

var Votes = require('../instances/Votes');

module.exports = Marionette.Object.extend({
    initialize: function () {
        this.listenTo(Radio.channel('votesChannel'), 'createComment', function (view) {
            var model = new CommentModel({}, {parentUrl: view.options.collection.parentUrl});
            model.set('user_id', 2);
            model.set('rating', 0);
            model.save({content_origin: view.ui.text.val()}, {
                success: function (data) {
                    //view.options.collection.fetch({async: false});
                    view.options.collection.add(data);
                    view.ui.text.val('');
                    Radio.trigger('votesChannel', 'setCommentsCount', view.options.collection.length);
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
        var model = undefined;
        var myCommentsCollection = new CommentsCollection([], {parentUrl: '/votes/' + id});
        myCommentsCollection.fetch({success: function(data) {Radio.trigger('votesChannel', 'setCommentsCount', data.length);}});

        if (Votes.get(id)) {
            model = Votes.get(id);
            app.render(new ShowVote({
                voteModel: model,
                collection: myCommentsCollection
            }));
        } else {
            model = new VoteModel({id: id});
            model.fetch();

            app.render(new ShowVote({
                voteModel: model,
                collection: myCommentsCollection
            }));

        }
    }
});