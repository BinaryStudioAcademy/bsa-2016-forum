var Marionette = require('backbone.marionette');
var Radio = require('backbone.radio');
var helper = require('../helpers/helper');

module.exports = Marionette.Behavior.extend({

    events: {
        'keyup @ui.message': 'keyUp',
        'submit @ui.form': 'send'
    },

    keyUp: function (e) {
        if (e.keyCode == 13) {
            var isEnter = this.view.ui.hotkeyCheckbox.prop('checked');
            if (helper.isOnlySpecialCharacters(this.view.ui[this.options.textui].val())) {
                return;
            }
            if (isEnter) {
                if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
                    e.preventDefault();
                    Radio.channel(this.options.channel).trigger(this.options.trigger, this.view);
                    // console.log('enter');
                }
            } else {
                if (e.ctrlKey) {
                    e.preventDefault();
                    Radio.channel(this.options.channel).trigger(this.options.trigger, this.view);
                    // console.log('Ctl-enter');
                }
            }
        }
    },

    send: function (e) {
        if (helper.isOnlySpecialCharacters(this.view.ui[this.options.textui].val())) {
            e.preventDefault();
            return;
        }
        e.preventDefault();
        Radio.channel(this.options.channel).trigger(this.options.trigger, this.view);
    }

});