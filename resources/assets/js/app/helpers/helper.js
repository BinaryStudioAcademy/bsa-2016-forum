var Helper = {
    isOnlySpecialCharacters: function (str) {
        return (str.trim().length == 0);
    },
    
    formatText: function (text) {
        return text.replace(/\n/g, '<br>');
    },

    formatText2: function (text) {
        return text.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
    }
};

module.exports = Helper;
