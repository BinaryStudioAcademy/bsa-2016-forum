var Handlebars = require('handlebars');
var app = require('../instances/appInstance');
var Backbone = require('backbone');

var ShowVote = require('../views/votes/ShowVote');

var Votes = require('./Votes');
var VoteModel = require('../models/VoteModel');
var CommentsCollection = require('../collections/commentCollection');
var CommentModel = require('../models/CommentModel');

module.exports = {
    register: function () {
        this.registerHelpers();
        this.registerAppEvents();
    },

    showVote: function (id) {
        var model = new VoteModel();
        var myCommentsCollection = new CommentsCollection([], {parentUrl: '/votes/' + id});
        var AddCommentModel = new CommentModel({parentUrl: '/votes/' + id});
        myCommentsCollection.fetch();

        if (Votes.get(id)) {
            model = Votes.get(id);
            app.render(new ShowVote({
                model: model,
                collection: myCommentsCollection,
                addcommodel: AddCommentModel
            }));
        } else {
            model = new VoteModel({id: id});
            model.fetch({
                success: function (data) {
                    app.render(new ShowVote({
                        model: model,
                        collection: myCommentsCollection,
                        addcommodel: AddCommentModel
                    }));
                }
            });

        }

    },

    registerHelpers: function () {
        Handlebars.registerHelper('helper1', function (context, options) {

        });
    },
    registerAppEvents: function () {
        var inst = app.getInstance();
        inst.on('show:vote', function (id) {
            Backbone.history.navigate('votes/' + id, {
                trigger: true
            });
        });

    }
};