var Marionette = require('backbone.marionette');
var _ = require('underscore');
var logger = require('../../instances/logger');
var Radio = require('backbone.radio');

module.exports = Marionette.ItemView.extend({
    template: 'AttachmentItem',
});