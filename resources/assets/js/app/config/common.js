var build = require('configBuild');
var custom = require('./config.custom');
var _ = require('underscore');

var defaults = {
    debug: true,
    baseUrl: '/api/v1',
    socketUrl: 'http://localhost:3000',
    messageChangeOnDelay: 15,
    timeZone: 'Europe/Kiev',
    parallelFileUploads : 10,
    maxFileSize: 8,
    maxFiles: 5,
    acceptedFiles: 'image/*,.pdf,.docx,.doc,.xlsx,.xls',
    maxFilesMessage: 'Max files is 5. File types are ' + this.acceptedFiles
};


var settings = _.extend(defaults, build);
settings = _.extend(settings, custom);

module.exports = settings;