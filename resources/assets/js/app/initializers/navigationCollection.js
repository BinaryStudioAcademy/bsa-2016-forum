var navigCollection = require('../collections/navigationCollection');

module.exports = new navigCollection([
    {
        href: '#dashboard',
        icon: 'tachometer',
        name: 'dashboard',
        label: 'Dashboard',
    },
    {
        href: '#topicCategories',
        icon: 'comments',
        name: 'topics',
        label: 'Topics',
    },
    {
        href: '#mytopics',
        icon: 'flag',
        name: 'myTopics',
        label: 'My topics',
    },
    {
        href: '#bookmarks',
        icon: 'bookmark',
        name: 'bookmarks',
        label: 'Bookmarks',
    },
    {
        href: '#votes',
        icon: 'asl-interpreting',
        name: 'votes',
        label: 'Votes',
    },
    {
        href: '#userVotes',
        icon: 'flag',
        name: 'myVotes',
        label: 'My votes'
    },
    {
        href: '#users',
        icon: 'users',
        name: 'users',
        label: 'Users'
    },
    {
        href: '#messages',
        icon: 'comments-o',
        name: 'messages',
        label: 'Messages'
    },
    {
        href: '#subscriptions',
        icon: 'bell',
        name: 'subscriptions',
        label: 'Subscriptions'
    }
]);
