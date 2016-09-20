var Helper = {
    isOnlySpecialCharacters: function (str) {
        return (str.trim().length == 0);
    },
    
    formatText: function (text) {
        return text.replace(/\n/g, '<br>');
    },

    attachmentThumb: function (attachs) {
        attachs.forEach(function (attach) {
            if (attach.type == 'image/jpeg' || attach.type == 'image/png' ||
                attach.type == 'image/gif') {
                attach.thumb = attach.url;
            } else {
                attach.thumb = 'images/doc.png';
            }

        });
    }
};

module.exports = Helper;
