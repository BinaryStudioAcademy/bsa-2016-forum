var Marionette = require('backbone.marionette');
require('bootstrap-3-typeahead');
var logger = require('../../instances/logger');
var messageCollection = require('./messageCollection');

module.exports = Marionette.LayoutView.extend({
    template: 'messageLayout',
    regions: {
        container: '#users-messages'
    },
    ui: {
        userSearch: '#typeahead'
    },
    onRender: function () {
        console.log('render');
        // var substringMatcher = function(strs) {
        //     return function findMatches(q, cb) {
        //         var matches, substrRegex;
        //
        //         // an array that will be populated with substring matches
        //         matches = [];
        //
        //         // regex used to determine if a string contains the substring `q`
        //         substrRegex = new RegExp(q, 'i');
        //
        //         // iterate through the pool of strings and for any string that
        //         // contains the substring `q`, add it to the `matches` array
        //         $.each(strs, function(i, str) {
        //             if (substrRegex.test(str)) {
        //                 matches.push(str);
        //             }
        //         });
        //         console.log('ttt');
        //
        //         cb(matches);
        //     };
        // };

        var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
            'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
            'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
            'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
            'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
            'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ];
        this.ui.userSearch.typeahead({
                hint: true,
                highlight: true,
                minLength: 1
            },
            {
                name: 'states',
                source: this.substringMatcher(states)
            });
        // this.ui.userSearch.typeahead('open');
        this.container.show(new messageCollection({
            collection: this.collection
        }));
        console.log(this.ui.userSearch);
    },
    substringMatcher: function(strs) {
        return function findMatches(q, cb) {
            var matches, substrRegex;

            // an array that will be populated with substring matches
            matches = [];

            // regex used to determine if a string contains the substring `q`
            substrRegex = new RegExp(q, 'i');

            // iterate through the pool of strings and for any string that
            // contains the substring `q`, add it to the `matches` array
            $.each(strs, function(i, str) {
                if (substrRegex.test(str)) {
                    matches.push(str);
                }
            });
            console.log('ttt');

            cb(matches);
        };
    }
});

