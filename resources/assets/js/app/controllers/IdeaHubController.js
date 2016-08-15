var app = require('../instances/appInstance');
var Marionette = require('backbone.marionette');
var VoteModel = require('../models/VoteModel');
var ListVotes = require('../views/votes/ListVotes');
var ShowVote = require('../views/votes/ShowVote');

var VotesCollection = require('../collections/voteCollection');
module.exports = Marionette.Object.extend({

    index: function () {

        VotesCollection.reset();
        VotesCollection.fetch({
            success: function (data) {
                debugger;
                lw = new ListVotes({vc: data});
                app.getInstance().RootView.content.show(lw);
            }
        });
    },
    showVote: function (id) {
        var model = undefined;
        if(VotesCollection.get(id)) {
            model = VotesCollection.get(id);
            app.getInstance().RootView.content.show(new ShowVote({model: model}));
        } else {
            console.log('else');
            model = new VoteModel({id: id}).fetch({success: function (data) {
                app.getInstance().RootView.content.show(new ShowVote({model: data}));
            }});
        }

        //app.getInstance().RootView.content.show(new ShowVote());
    }
});