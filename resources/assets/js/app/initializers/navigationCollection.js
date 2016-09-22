var navigCollection = require('../collections/navigationCollection');

module.exports = new navigCollection([
    // dashboard
    {
        href: '#dashboard',
        icon: 'tachometer',
        name: 'dashboard',
        label: 'Dashboard'
    },
    // topic categories
    {
        href: '#topicCategories',
        icon: 'comments',
        name: 'topics',
        label: 'Topics'
    },
    // votes list
    {
        href: '#votes',
        icon: 'asl-interpreting',
        name: 'votes',
        label: 'Votes'
    },
    // messages
    {
        href: '#messages',
        icon: 'comments-o',
        name: 'messages',
        label: 'Messages'
    },
    // my topics
    {
        href: '#mytopics',
        icon: 'comments',
        name: 'myTopics',
        label: 'My topics'
    },
    // my votes
    {
        href: '#userVotes',
        icon: 'asl-interpreting',
        name: 'myVotes',
        label: 'My votes'
    },
    // bookmarks
    {
        href: '#bookmarks',
        icon: 'bookmark',
        name: 'bookmarks',
        label: 'Bookmarks'
    },
    // subscriptions
    {
        href: '#subscriptions',
        icon: 'bell',
        name: 'subscriptions',
        label: 'Subscriptions'
    },
    
    // This navObject MUST BE last in The list
    // user list
    {
        href: '#users',
        icon: 'users',
        name: 'users',
        label: 'Users'
    }
]);
