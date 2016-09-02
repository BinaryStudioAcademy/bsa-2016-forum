var messageHelper = {
    isOnlySpecialCharacters: function (str) {
        var len = str.length;
        for (var i = 0; i < len; i++) {
            switch (str.charCodeAt(i)) {
                case 32:
                    continue;
                    break;
                case 10:
                    continue;
                    break;
                case 13:
                    continue;
                    break;
                default:
                    return false;
            }
        }
        return true;
    }
};

module.exports = messageHelper;
