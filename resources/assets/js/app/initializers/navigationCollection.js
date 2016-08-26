var navigCollection = require('../collections/navigationCollection');

module.exports = new navigCollection([
    {
        href: '#dashboard',
        icon: '',
        name: 'dashboard',
        label: 'Dashboard'
        //active: true
    },

    {
        href: '#topics',
        icon: '',
        name: 'topics',
        label: 'Topics'
    },
    {
        href: '#users',
        icon: '',
        name: 'users',
        label: 'Users'
    },
    {
        href: '#subscribes',
        icon: '',
        name: 'subscribes',
        label: 'Subscribes'
    },
    {
        href: '#votes',
        icon: '',
        name: 'votes',
        label: 'Votes'
    }
]);
