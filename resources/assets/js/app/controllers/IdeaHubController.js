var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var Handlebars = require('handlebars');
var moment = require('moment');

var currentUser = require('../initializers/currentUser');

var VoteModel = require('../models/VoteModel');
var CommentModel = require('../models/CommentModel');

var CommentsCollection = require('../collections/commentCollection');
var VoteAICollection = require('../collections/voteAICollection');

var ListVotes = require('../views/votes/ListVotes');
var ShowVote = require('../views/votes/ShowVote');

var Votes = require('../instances/Votes');

module.exports = Marionette.Object.extend({
    initialize: function () {
        this.listenTo(Radio.channel('votesChannel'), 'createComment', function (view) {
            var model = new CommentModel({user_id: currentUser.get('id')}, {parentUrl: view.options.collection.parentUrl});
            model.save({content_origin: view.ui.text.val()}, {
                success: function (data) {
                    view.ui.text.val('');
                    //view.options.collection.fetch({async: false});
                    view.options.collection.add(data);
                    Radio.trigger('votesChannel', 'setCommentsCount', view.options.collection.length);
                }
            });
        });

        Handlebars.registerHelper('deleteButton', function (id, created_at, position_absolute) {
            var style = 'position:absolute;';
            if(position_absolute == false) {
                style = 'position:relative; float:none;'
            }
            if(currentUser.get('role') == 'Admin' || (currentUser.get('id') == id && moment(created_at).add(15, 'm').isAfter(moment()))) {
                return new Handlebars.SafeString('<button style="'+style+'" class="btn btn-md btn-danger delete-button"><span class="glyphicon glyphicon-remove-sign"></span></button>');
            }
        });
    },
    
    index: function () {

        Votes.reset();
        var view = new ListVotes({vc: Votes});
        app.render(view);
        Votes.fetch();
    },
    showVote: function (id) {
        var model;
        var parentUrl = '/votes/' + id;
        var myCommentsCollection = new CommentsCollection([], {parentUrl: parentUrl});
        var VoteAnswers = new VoteAICollection([], {parentUrl: parentUrl});
        VoteAnswers.fetch();
        myCommentsCollection.fetch({success: function(data) {Radio.trigger('votesChannel', 'setCommentsCount', data.length);}});

        if (Votes.get(id)) {
            model = Votes.get(id);
            app.render(new ShowVote({
                voteModel: model,
                collection: myCommentsCollection,
                answers: VoteAnswers
            }));
        } else {
            model = new VoteModel({id: id});
            model.fetch();

            app.render(new ShowVote({
                voteModel: model,
                collection: myCommentsCollection,
                answers: VoteAnswers
            }));

        }
    }
});