var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({
    template: 'create-vote-header',
    ui: {
        title: '#question-title',
        errors: '.js-errors',
        tags: '#tags',
        isPublic: 'input[name=access]',
        finished: '#finished',
        isSingle: 'input[name=isSingle]'
    },
    modelEvents: {
        'change':'render',
        'invalid': function (model, errors) {
            this.ui.errors.empty();
            var self = this;
            _.each(errors, function (error, key) {
                self.$('.js-error-' + key).html(error);
            });
        },
        
        // 'change:is_public': function (model) {
        //
        //     if(!model.get('is_public') || model.get('is_public') == "0") {
        //         var naUsers =  this.getOption('users');
        //         var aUsers = this.getOption('accessedUsers');
        //         naUsers.remove(naUsers.models);
        //         aUsers.remove(aUsers.models);
        //         if(model.get('id')) {
        //             naUsers.fetch({success: function (response) {
        //                 aUsers.add(response.remove(_.pluck(model._meta[model.get('id')].accessedUsers, 'user_id')));
        //             }});
        //         } else {
        //             naUsers.fetch();
        //         }
        //
        //     }
        // },
        // 'sync': function () {
        //     this.ui.errors.empty();
        // }
    },
    events: {
        'change @ui.title': function () {
            this.model.save({title: this.ui.title.val()});
        },
        'click @ui.isPublic': function () {
            this.saveModel({is_public: this.ui.isPublic.filter(':checked').val()});
            if (this.ui.isPublic.prop('checked')) {
                this.ui.selectAccessedUsersBlock.hide();
            } else
                this.ui.selectAccessedUsersBlock.show();
        },
        'click @ui.isSingle': function () {
            this.saveModel({is_single: this.ui.isSingle.filter(':checked').val()});

        },
        'change @ui.finished': function () {
            this.saveModel({finished_at: DateHelper.dateWithoutTimezone(this.ui.finished.val())});
        }
    },
    serializeData: function () {
        var meta = this.model.getMetaById() || {
                deletable: !true,
                editable: !true,
                title:'',
                tags:''
            };

        return {
            model: this.model.toJSON(),
            meta: meta
        };
    },
    saveModel: function (obj) {
        if (this.model.get('id')) {
            this.model.save(obj);
        } else {
            this.model.set(obj);
        }
    }
});