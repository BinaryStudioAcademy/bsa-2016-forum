var Helper = {
    isOnlySpecialCharacters: function (str) {
        return (str.trim().length == 0);
    },
    
    formatText: function (text) {
        return text.replace(/\n/g, '<br>');
    }
};

module.exports = Helper;
