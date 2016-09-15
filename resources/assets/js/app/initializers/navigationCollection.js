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
    // {
    //     href: '#mytopics',
    //     icon: '',
    //     name: 'myTopics',
    //     label: 'My topics',
    // },
    // {
    //     href: '#bookmarks',
    //     icon: '',
    //     name: 'bookmarks',
    //     label: 'Bookmarks',
    // },
    {
        href: '#votes',
        icon: 'asl-interpreting',
        name: 'votes',
        label: 'Votes',
    },
    // {
    //     href: '#userVotes',
    //     icon: '',
    //     name: 'myVotes',
    //     label: 'My votes'
    // },
    //This navObject MUST BE last in The list
    {
        href: '#users',
        icon: 'users',
        name: 'users',
        label: 'Users'
    },
    // {
    //     href: '#messages',
    //     icon: '',
    //     name: 'messages',
    //     label: 'Messages'
    // },
    // {
    //     href: '#subscriptions',
    //     icon: '',
    //     name: 'subscriptions',
    //     label: 'Subscriptions'
    // }
]);
