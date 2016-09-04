var navigCollection = require('../collections/navigationCollection');

module.exports = new navigCollection([
    {
        href: '#topicCategories',
        icon: '',
        name: 'topics',
        label: 'Topics',
    },
    {
        href: '#mytopics',
        icon: '',
        name: 'myTopics',
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
        label: 'Bookmarks',
    },
    {
        href: '#votes',
        icon: '',
        name: 'votes',
        label: 'Votes',
    },
    {
        href: '#messages',
        icon: '',
        name: 'messages',
        label: 'Messages'
    },
    {
        href: '#userVotes',
        icon: '',
        name: 'myVotes',
        label: 'My votes'
    }

]);

// <div class="users-item-vote">
//     <a href='#/users/{{id}}/votes'>
//     <img src="/images/vote_img.png"><div class="hidden-xs"><span>My idea hubs</span></div>
// </a>
// </div>