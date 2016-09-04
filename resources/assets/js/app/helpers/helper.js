var Helper = {
    isOnlySpecialCharacters: function (str) {
        if (str.trim().length != 0 ) {
            return false;
        }
        return true;
    }
};

module.exports = Helper;
