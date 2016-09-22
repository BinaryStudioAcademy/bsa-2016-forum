var ListVotesItem = require('./ListVotesItem');
var paginateableCollectionView = require('../../instances/paginateableCollectionView');

module.exports = paginateableCollectionView.extend({
    childView : ListVotesItem,
    className: 'news-items votes',
    tagName: 'ul'
});
