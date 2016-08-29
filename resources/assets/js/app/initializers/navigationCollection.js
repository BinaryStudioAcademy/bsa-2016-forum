var navigCollection = require('../collections/navigationCollection');

module.exports = new navigCollection([
    {
        href: '#dashboard',
        icon: '',
        name: 'dashboard',
        label: 'Dashboard',
        //active: true
    },

    {
        href: '#topicCategories',
        icon: '',
        name: 'topics',
        label: 'Topics'
    },
    {
        href: '#mytopics',
        icon: '',
        name: 'mytopics',
        label: 'My topics',
    },
    {
        href: '#users',
        icon: '',
        name: 'users',
        label: 'Users'
    },
    {
        href: '#bookmarks',
        icon: '',
        name: 'bookmarks',
        label: 'Bookmarks'
    },
    {
        href: '#votes',
        icon: '',
        name: 'votes',
        label: 'Votes'
    },
    {
        href: '#messages',
        icon: '',
        name: 'messages',
        label: 'Messages'
    }

]);
