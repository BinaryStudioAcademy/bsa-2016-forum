module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["bookmarksCollection"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"bookmarks\">\r\n    <div class=\"bookmarks-head\">My bookmarks</div>\r\n    <div class=\"bookmarks-container\" id=\"bookmarks\">\r\n\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["bookmarksItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"bookmarks-item\">\r\n    <img src=\"/images/user.png\">\r\n    How to connect to multiple databases in Spring Boot JPA?\r\n</div>";
},"useData":true});

this["JST"]["forumStats"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"forum-stats\">\r\n    <div class=\"forum-stats-head\">Statistics</div>\r\n    <div class=\"forum-stats-container\">\r\n        <div class=\"forum-stats-item\">\r\n            <img src=\"/images/user.png\">\r\n            <p>Topics</p>\r\n            <span>8</span>\r\n        </div>\r\n        <div class=\"forum-stats-item forum-stats-border\">\r\n            <img src=\"/images/user.png\">\r\n            <p>Votes</p>\r\n            <span>5</span>\r\n        </div>\r\n        <div class=\"forum-stats-item\">\r\n            <img src=\"/images/user.png\">\r\n            <p>Comments</p>\r\n            <span>17</span>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["bookmarkItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"bookmarks-item\">\r\n    <button class=\"btn btn-xs btn-danger delete-button\"><i class=\"glyphicon glyphicon-trash\"></i></button>\r\n    <a href=\"#topics/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.topic_id : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.topic : stack1)) != null ? stack1.name : stack1), depth0))
    + "</a>\r\n</div>";
},"useData":true});

this["JST"]["bookmarkLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"bookmarks-page\">\r\n    <div class=\"bookmarks-head\">My bookmarks</div>\r\n    <div class=\"bookmarks-container\" id=\"bookmarks\">\r\n\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"hdr-header\"><img id=\"BSheaderLogo\" src=\"http://academy.binary-studio.com/resources/logo.png\"\r\n                             class=\"hdr-logo\"/>\r\n    <div>\r\n        <div class=\"hdr-buttons\"><input id=\"searchBar\" placeholder=\"Search\"/><a id=\"userLink\"\r\n                                                                                class=\"hdr-noTextDecoration\">\r\n            <div id=\"userProfile\"><img id=\"avatar\" class=\"hdr-avatar\"/><span id=\"userName\"></span><span\r\n                    id=\"profileBarArrDwn\"></span></div>\r\n        </a>\r\n            <button id=\"appsBtn\" class=\"hdr-button\"><img src=\"http://team.binary-studio.com/app/images/Thumbnails.png\"\r\n                                                         class=\"hdr-appsLogo\"/></button>\r\n            <button id=\"notificationBtn\" class=\"hdr-button\"><img src=\"http://team.binary-studio.com/app/images/bell.png\"\r\n                                                                 class=\"hdr-appsLogo\"/></button>\r\n        </div>\r\n        <div id=\"notificationCounter\" class=\"hdr-invisible\"></div>\r\n        <div id=\"search\"></div>\r\n    </div>\r\n</div>\r\n<div id=\"logOutBox\" class=\"hdr-invisible hdr-headerElements\">\r\n    <div id=\"userprofileBtnInBox\" class=\"hdr-logOutButtons\">\r\n        <button id=\"userProfileInBoxBtn\" class=\"hdr-userprofileAndLogoutBtn hdr-button\"><img\r\n                src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABFUlEQVRIS82V3RHBQBSFv3SgA1RACVSACtABFaACJdABHdABKkAHSjAnk+QhdrM3MXbcl8yE3e+e+3OSECGSCAzqQAbAFOhkiZ2BjSVJK2QBbB0XPjLQvgpmgSjzeyDjLiCgMyyQGbALQFS29TcQHV79GhJFiabqFFAyBDRtjXvSBy7/0Pg54B1jy3S1slL0PGpugEr6+qZcOlvV/EoVOmxRkieoZWuXsn0C6plXRV2Ia18qlzBPqI6SKJAjMCqVS+8mISe2KJFByoHHnssEWjY1SI2lPEtPS+Tfl4/NdynRXhxqXF5OQBCVsJg4F+QK+BbPokj/EUh+lkYZYjFDK6gwTRfE2oMQTGrS/limK3RZ8PcokDcWljAaGF/vbwAAAABJRU5ErkJggg==\"\r\n                class=\"hdr-userprofileAndLogoutImg\"/><span>Profile</span></button>\r\n    </div>\r\n    <div id=\"logOutBtnInBox\" class=\"hdr-logOutButtons\">\r\n        <button id=\"logOutButton\" class=\"hdr-userprofileAndLogoutBtn hdr-button\"><img\r\n                src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAx0lEQVRIS+2V0Q3CQAxDXydgBGATRqEbwEQwCiPABrBBmQBklEqhKpwruC+4n/uoYydOrmmofJrK/GSBFbADFqboGWiBwzt8FlDA3CTvYYpZugK3ALq2WfhMZgWkbC38bwtY8/CJRUOBPbABuvzhmwJq+jHehu7HcQT6abEsiQq2gCqqInANq2wBN3NVegLWYZVtkStQvcmjiThNflXB/1dR7O1ki/TEZ0XaZ8CltAGHK1Oj5m41kWvm7ZU5MXkP7q5Hj20EdQcvdDIZh0O7hwAAAABJRU5ErkJggg==\"\r\n                class=\"hdr-userprofileAndLogoutImg\"/><span>Logout</span></button>\r\n    </div>\r\n</div>\r\n<div id=\"appsBlock\" class=\"hdr-invisible\">\r\n    <div id=\"appsList\"></div>\r\n</div>\r\n<div id=\"notificationBlock\" class=\"hdr-invisible\">\r\n    <ul id=\"notificationList\"></ul>\r\n    <a id=\"readAllBtn\" href=\"\" class=\"hdr-noTextDecoration hdr-specialNotifBtn\"><img width=\"20\" height=\"20\"\r\n                                                                                     src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABkElEQVRIS+2U7S0EURSGn60AHVABKqADdLAqQAWoABWgAlSACtABFaAC8kzOK9dmZzP+bEScZJLdO+e8X/feGTGHGs2Bg3+SH6X8a+LaBLaAtXoWgTfgsZ5r4H6WtVlOxsAhdIfjArgrUAkkklQB+8ArcARcTiObRuLwOfAObADrBe6873R1M7H2UG4WgN3mXcc5SaIalfk8lzrVWjqTPCWYDi1dOrsMnFYCZ2lsSRxQ6XZDYJ/DljGpNKWIlfqTnhC5T7pTyJeTKNKBYC14H8lLKZ/W657p6EMinWSDoypKdSTp0LgE1UFbXeSJSyeyHjRObLZJMo+rlTgFy5oinHc/Ujo5qaTGk3uyCuwUuAMSGJdAibFVKvBtiYsL166Ap0qp93QZYYb8bRR7dUx1J5BHWQG6z54qyhN4XDOdoL574pAXzGaPp6ACCuIJ8w4pwjVJderFXSr1ibKXJHHoQBDJBJTMCHLjjVZwiQW3N46+7f6QD2SA8u2Kk/bbpYDeGkIya37Qu3+SQTGl6e/E9QlOFWJ6RtIuVwAAAABJRU5ErkJggg==\"/></a><a\r\n        href=\"http://team.binary-studio.com/app/#/\" class=\"hdr-noTextDecoration hdr-specialNotifBtn\"><img width=\"20\"\r\n                                                                                                          height=\"20\"\r\n                                                                                                          src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB30lEQVRYR+2W7VHCQBCGoQK1A60ArECsQK1ArECtAKwArMBYgXYAVqBWoFagVqDvw+w6R8jlQ0jyh5vZ4QJ3+z63Hxe6nZZHt2X9zhaACIxlP22lAgDEX2VfDUPsSq/nAMd6mDcMMJDezAGu9TBtGIDUjxwA7UR20RAEWudoOcCN5leyBxnRqKseyPudjJQT8b8I8AWi1MGbLdg0BOIz2YGM/C+e00XIl0DQGaTjZUMp6Vt0v02cwwGxAoAeEI+ynkViXQjEOfmTbGiRRicK4IdONDmRURPM/zMQJOf3Jh76KARgMYU5kZGOqhC+N9bipQCA8FMAULZNWUub5YGXBgDCHVIbOI11iLfZqe3JAy4FkO5bovEp87YNc+pttmfipIDiiwEXAlC9FBAOORHd4G26Y47nRoAzLrEPGXMixH4iBnBWS+cCIIg4b0nmYciBSGR0yLsB7OuTSufUWWuPDAIgH1GAqVZcyriex8GG9BRR4Bg4dpisLfgZmT/8MlYACDFhPJQNzWmOfuWfvDCftfNMtrigwtcxp+aqRHzd2y9Gh2gio4ZuZZPwdZyVw8rHLLEhrKGl1zF5anKgt/Q6njepLq1BWAPkPHa71cVFKvr+t7wukUK/ALQ6tgCtR+AX0EuQCjZ0KYUAAAAASUVORK5CYII=\"/></a><a\r\n        href=\"http://team.binary-studio.com/app/#/settings\" class=\"hdr-noTextDecoration hdr-specialNotifBtn\"><img\r\n        width=\"20\" height=\"20\"\r\n        src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACL0lEQVRYR9WXgVHDMAxF2wlgA8oEwASUDcoElAmADdIJgAkoE9BOQDegbFAmACYAPc7OqYocJ21zPXTna2NbX1+yJCf93mbyIGo3RnUiz0VbuH5bhbB/Ib/nRncuz6O2eJsS+BRDh8bYSp6Pd0XgVIBeZNzJmBlQDEPAE88honIv41LG0ip5Chh/VR5OA5GvoMzZkwOeXMsk+xGIYngcntG/sCQsAWs8GlkFYMAGCeN6LwTZC56WCglLAENHGQPbLr9rYpbAUBYJf5fCMSyiAS8HvBrfFaFHAbrVYB4BkgeGJ7uyGnDWQl8XAda6iAIlXameVCPyGo0NCB7FuibbcxEjwSuNyhIg/FceU2X9W/4Xzh7OlvmDmqMbyxotO/aUHgRoFnjAsO3Vw9LNxq5DArycQIDoLSHwk9ut1t1EMvoA546jVGlL4Fk0CWOdTGWRY2wk/44A4T3LuPYW8qlxBIqgQBI2uQfceg7Wmibhh05CyzQHQgZDmraqhWua+bpKqlRQqhGtGkTjr4wCg1jGdWHH64HdkCKw11ZMCEmkCttGWZXeRLS4issuyFYvAk8yP97SWEo9ex2PRJOX0S6Fl9NZNLCPV7K1ZPReShfCzt5o3AFTGZRorldggCTmGO2dwE06lBGrx80BSkqTsOcGMHniia1zXU0V4wCkyhAS0WPIaKFK2nyY4DFY5FfpeQRMEUg4WE5TSvaY3EaTA9qUAFHZ68ep1yknQqrIeWzXfwFZJHIs2+DwVAAAAABJRU5ErkJggg==\"/></a>\r\n</div>";
},"useData":true});

this["JST"]["navigationItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.href || (depth0 != null ? depth0.href : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"href","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data}) : helper)))
    + "</a>\r\n";
},"useData":true});

this["JST"]["navigationLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"menu-container\">\r\n    <div class=\"container\">\r\n        <nav class=\"navbar\" id=\"menu\">\r\n            <div class=\"navbar-header\">\r\n                <button type=\"button\" class=\"btn btn-navbar navbar-toggle btn-lg\"\r\n                        data-toggle=\"collapse\" data-target=\".navbar-ex1-collapse\">\r\n                    <span class=\"glyphicon glyphicon-align-justify\"></span>\r\n                </button>\r\n            </div>\r\n            <div class=\"navbar-collapse navbar-ex1-collapse collapse\" aria-expanded=\"true\">\r\n                <div id=\"navig-menu\"></div>\r\n            </div>\r\n        </nav>\r\n    </div>\r\n</div>\r\n";
},"useData":true});

this["JST"]["mainLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"header\"></div>\r\n<div id=\"navigationMenu\"></div>\r\n<div class=\"container\">\r\n    <div class=\"breadcrumbs-container\" id=\"breadcrumbs\">\r\n        <ol class=\"breadcrumb\">\r\n            <li><a href=\"#\"></a></li>\r\n        </ol>\r\n    </div>\r\n    <div class=\"content-container\">\r\n        <div class=\"content-container-main\" id=\"main-content\">\r\n\r\n        </div>\r\n        <div class=\"content-container-bar hidden-xs\" id=\"bar-content\">\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"footer\"></div>\r\n\r\n";
},"useData":true});

this["JST"]["messageDialogEditItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"modal fade\">\r\n    <div class=\"modal-dialog\" role=\"document\">\r\n        <div class=\"modal-content message-edit\">\r\n            <form id=\"message-edit-form\">\r\n                <div class=\"modal-body\">\r\n                    <textarea required id=\"edited-message\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.message : depth0)) != null ? stack1.message : stack1), depth0))
    + "</textarea>\r\n                    <span>"
    + alias2(((helper = (helper = helpers.edit_at || (depth0 != null ? depth0.edit_at : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"edit_at","hash":{},"data":data}) : helper)))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.message : depth0)) != null ? stack1.updated_at : stack1), depth0))
    + "</span>\r\n                </div>\r\n                <div class=\"modal-footer message-new-control\">\r\n                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>\r\n                    <button type=\"submit\" class=\"btn btn-secondary\" id=\"message-save\">Save</button>\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["messageDialogItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "<div class=\"message-msg-item\">\r\n    <!-- addition class 'to' or 'from' to mark msg direction -->\r\n    <div class=\"message-item-container "
    + alias4(((helper = (helper = helpers.messageDirection || (depth0 != null ? depth0.messageDirection : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"messageDirection","hash":{},"data":data}) : helper)))
    + "\">\r\n        <div class=\"message-msg-avatar\">\r\n            <!-- message owner avatar -->\r\n            <img src=\"/images/user.png\">\r\n        </div>\r\n        <div class=\"message-msg-body "
    + alias4(((helper = (helper = helpers.deleted || (depth0 != null ? depth0.deleted : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"deleted","hash":{},"data":data}) : helper)))
    + "\">\r\n            <p><b>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.first_name : stack1), depth0))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.last_name : stack1), depth0))
    + "</b></p>\r\n            <p>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.message : depth0)) != null ? stack1.message : stack1), depth0))
    + "</p>\r\n            <span>"
    + alias4(((helper = (helper = helpers.edit_at || (depth0 != null ? depth0.edit_at : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"edit_at","hash":{},"data":data}) : helper)))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.message : depth0)) != null ? stack1.updated_at : stack1), depth0))
    + "</span>\r\n            <div><a class=\"edit\">Edit</a>&nbsp;<a class=\"delete\">Delete</a></div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["messageDialogLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"message-dialog\">\r\n    <div class=\"message-msg-container\" id=\"dialog-messages\">\r\n\r\n    </div>\r\n    <div id=\"edit-msg-modal\"></div>\r\n    <div class=\"message-new\">\r\n        <form id=\"message-new-form\">\r\n            <textarea required class=\"form-control\" id=\"messages-new-text\" placeholder=\"Message...\" name=\"message\"></textarea>\r\n            <div class=\"message-new-control\">\r\n                <a>Attach</a>\r\n                <input class=\"hotkey-checkbox\" type=\"checkbox\" name=\"hotkey\" id=\"hotkey-checkbox\" />\r\n                <label class=\"hotkey-checkbox-label\" for=\"hotkey-checkbox\">Use Enter-key to send</label>\r\n                <button type=\"submit\" class=\"send\" id=\"messages-new-submit\">Send</button>\r\n            </div>\r\n        </form>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["messageItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"messages-user-item\">\r\n    <a href=\"#messages/user/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.id : stack1), depth0))
    + "\">\r\n        <div class=\"messages-msg-avatar hidden-xs\">\r\n            <!-- from msg avatar -->\r\n            <img src=\"/images/user.png\">\r\n        </div>\r\n        <div class=\"messages-msg\">\r\n            <span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.first_name : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.user : depth0)) != null ? stack1.last_name : stack1), depth0))
    + "</span>\r\n            <!-- if unread add class .unread -->\r\n            <div class=\"messages-msg-body\">\r\n                <div>\r\n                    <p>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.message : depth0)) != null ? stack1.message : stack1), depth0))
    + "</p>\r\n                </div>\r\n            </div>\r\n            <i>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.message : depth0)) != null ? stack1.updated_at : stack1), depth0))
    + "</i>\r\n        </div>\r\n    </a>\r\n</div>";
},"useData":true});

this["JST"]["messageLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"messages\">\r\n    <div class=\"messages-user-container\" id=\"users-messages\">\r\n\r\n    </div>\r\n</div> ";
},"useData":true});

this["JST"]["topicCategoryItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"col-xs-10 col-sm-10 col-md-10 col-lg-10\">\r\n    <div class=\"category-title\"><a href=\"#categories/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "/topics\"> "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + " </a></div>\r\n</div>\r\n";
},"useData":true});

this["JST"]["topicCategoryItemForSelector"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <option value=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</option>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<select class=\"form-control\" name=\"category_id\">\r\n    <option disable>Choose Topic category</option>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\r\n</select>\r\n<div class=\"errors\"> </div>";
},"useData":true});

this["JST"]["topicCategoryLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\r\n    <div class=\"post-head\">\r\n        <div class=\"\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\">\r\n                    <div>TOPIC CATEGORIES</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"posts\" id=\"categories\">\r\n\r\n    </div>\r\n</div>\r\n";
},"useData":true});

this["JST"]["topicCreateNew"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<form class=\"topic-form\">\r\n    <div class=\"topic-new-head\">\r\n        <h4>Create New Thread</h4>\r\n    </div>\r\n    <div id=\"categories\">\r\n    <div class=\"errors\"></div>\r\n    </div>\r\n    <div class=\"topic-new-title\">\r\n        <input type=\"text\" placeholder=\"Enter Topic Title\" name=\"name\">\r\n        <div class=\"errors\"></div>\r\n    </div>\r\n    <div class=\"topic-new-body\">\r\n        <textarea rows=\"10\" name=\"description\"></textarea>\r\n        <div class=\"errors\"></div>\r\n        <div class=\"topic-new-attachment\">\r\n            <a>Attach</a>\r\n        </div>\r\n    </div>\r\n    <div class=\"topic-new-control\">\r\n        <!--<div class=\"topic-new-notification checkbox\">\r\n            <label><input type=\"checkbox\" name=\"report_me\">Report me when someone post a reply</label>\r\n        </div>--!>\r\n        <div class=\"topic-new-submit\">\r\n            <input type=\"submit\" value=\"Start Thread\">\r\n        </div>\r\n    </div>\r\n</form>";
},"useData":true});

this["JST"]["topicDetail"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"topic\">\r\n    <div class=\"topic-head topic-comment\">\r\n        <div class=\"topic-comment-flex\">\r\n            <div class=\"topic-bar hidden-xs\">\r\n                <div class=\"topic-avatar topic-avatar-border\">\r\n                    <img src=\"/images/user.png\">\r\n                </div>\r\n                <div class=\"topic-addition\">\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"topic-body\">\r\n                <div class=\"topic-header\">\r\n                    <h4>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h4>\r\n                </div>\r\n                <div class=\"topic-msg\">\r\n                    <p> "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\r\n                </div>\r\n                <div class=\"topic-tags\">\r\n                    <span>#movie</span><span>#cinema</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"topic-control\">\r\n            <div class=\"topic-bar hidden-xs\"></div>\r\n            <div class=\"topic-history\">"
    + alias4(((helper = (helper = helpers.created_at || (depth0 != null ? depth0.created_at : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"created_at","hash":{},"data":data}) : helper)))
    + ": usernik</div>\r\n            <div class=\"topic-control-btn\">\r\n                <a>Edit</a><a>Answer</a><button class=\"bookmark-btn text-info\">Bookmark</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"topic-comments\" id=\"topic-comments\">\r\n\r\n    </div>\r\n    <a class=\"topic-more\">Load more</a>\r\n    <div class=\"topic-comment-main\">\r\n        <div class=\"topic-comment-flex\">\r\n            <div class=\"topic-bar hidden-xs\">\r\n                <div class=\"topic-avatar\">\r\n                    <img src=\"/images/user.png\">\r\n                </div>\r\n                <div class=\"topic-addition\">\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"topic-body\">\r\n                <textarea class=\"form-control\" rows=\"3\" placeholder=\"Comment...\"></textarea>\r\n                <div class=\"topic-attachment\"><a>Attach</a></div>\r\n            </div>\r\n        </div>\r\n        <div class=\"topic-control\">\r\n            <div class=\"topic-control-btn topic-control-add\">\r\n                <button class=\"btn btn-default\">Add comment</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["topicDetailCommentItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"topic-comment-item\">\r\n    <div class=\"topic-comment-main\">\r\n        <div class=\"topic-comment-flex\">\r\n            <div class=\"topic-bar hidden-xs\">\r\n                <div class=\"topic-avatar\">\r\n                    <img src=\"/images/user.png\">\r\n                </div>\r\n                <div class=\"topic-addition\">\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"topic-body\">\r\n                <div class=\"topic-msg\">\r\n                    <p>Even though a field is marked as 'editable=False' in the model, I would like the admin page to display it. Currently it hides the field altogether.. How can this be achieved ?</p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"topic-control\">\r\n            <div class=\"topic-history-margin hidden-xs\"></div>\r\n            <div class=\"topic-history\">P: 21 Nov 9:43 U: usernik</div>\r\n            <div class=\"topic-control-btn\">\r\n                <a>Edit</a><a>Share</a><a>Reply</a><a>notification</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"topic-comment-included\">\r\n        <!-- comments on this comment container -->\r\n        <!-- comment item such as this item -->\r\n        <!-- <div class=\"topic-comment-item\">\r\n                <div class=\"topic-comment-main\">\r\n                    <di ... -->\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["topicItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\">\r\n    <div class=\"post-title\"><a href=\"#topics/"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.id : stack1), depth0))
    + "\"> "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.name : stack1), depth0))
    + " </a><br>\r\n        <button class=\"btn btn-info btn-xs text-info bookmark-btn\">Bookmark</button>\r\n    </div>\r\n</div>\r\n<div class=\"col-sm-1 col-md-1 col-lg-1 hidden-xs\">\r\n    <div class=\"text-center\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.rating : stack1), depth0))
    + "</div>\r\n</div>\r\n<div class=\"col-sm-1 col-md-1 col-lg-1 hidden-xs\">\r\n    <div class=\"text-center\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.reviewed_number : stack1), depth0))
    + "</div>\r\n</div>\r\n<div class=\"col-sm-1 col-md-1 col-lg-1 hidden-xs\">\r\n    <div class=\"text-center\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.usersCount : stack1), depth0))
    + "</div>\r\n</div>\r\n<div class=\"col-sm-1 col-md-1 col-lg-1 hidden-xs\">\r\n    <div class=\"text-center\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.answersCount : stack1), depth0))
    + "</div>\r\n</div>\r\n<div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\">\r\n    <div class=\"text-center\">"
    + alias2(((helper = (helper = helpers.createdDate || (depth0 != null ? depth0.createdDate : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"createdDate","hash":{},"data":data}) : helper)))
    + "</div>\r\n</div>\r\n";
},"useData":true});

this["JST"]["topicLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\r\n    <div class=\"container-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"create-topic pull-right\">\r\n                <a href=\"#topic/create\">\r\n                    <button class=\"btn btn-warning btn-lg\">\r\n                        <span class=\"hidden-xs\">Create topic</span>\r\n                        <span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span>\r\n                    </button>\r\n                </a>\r\n            </div>\r\n            <div class=\"clear\"></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"post-head\">\r\n        <div class=\"\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\">\r\n                    <div>Title</div>\r\n                </div>\r\n                <div class=\"col-sm-1 col-md-1 col-lg-1 hidden-xs\">\r\n                    <div class=\"text-center\">Rating</div>\r\n                </div>\r\n                <div class=\"col-sm-1 col-md-1 col-lg-1 hidden-xs\">\r\n                    <div class=\"text-center\">Views</div>\r\n                </div>\r\n                <div class=\"col-sm-1 col-md-1 col-lg-1 hidden-xs\">\r\n                    <div class=\"text-center\">Active users</div>\r\n                </div>\r\n                <div class=\"col-sm-1 col-md-1 col-lg-1 hidden-xs\">\r\n                    <div class=\"text-center\">Answers</div>\r\n                </div>\r\n                <div class=\"col-xs-2 col-sm-2 col-md-2 col-lg-2\">\r\n                    <div class=\"text-center\">Date</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"posts\" id=\"posts\">\r\n\r\n    </div>\r\n</div>\r\n";
},"useData":true});

this["JST"]["userItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"users-item\">\r\n    <div class=\"users-item-avatar\">\r\n        <img src=\"/images/user.png\">\r\n    </div>\r\n    <div class=\"users-item-credential\">\r\n        <div class=\"users-item-name\">\r\n            <span>"
    + alias4(((helper = (helper = helpers.first_name || (depth0 != null ? depth0.first_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"first_name","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.last_name || (depth0 != null ? depth0.last_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"last_name","hash":{},"data":data}) : helper)))
    + "</span>\r\n        </div>\r\n        <div class=\"users-item-email\">\r\n            <a href=\"mailto:"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</a>\r\n        </div>\r\n        <div class=\"users-item-permission\" id=\"users-permission\">\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"users-item-msg\">\r\n        <a href=\"#messages/user/"
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\r\n            <img src=\"/images/message.png\"><div class=\"hidden-xs\"><span>Message</span></div>\r\n        </a>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["userLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"users\">\r\n    <div id=\"users\">\r\n\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["userPermissionItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<option value=\""
    + alias4(((helper = (helper = helpers.some_id || (depth0 != null ? depth0.some_id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"some_id","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.permission || (depth0 != null ? depth0.permission : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"permission","hash":{},"data":data}) : helper)))
    + "</option>";
},"useData":true});

this["JST"]["voteAnswerItem"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"radio\">\r\n        <label>\r\n            <input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios1\" value=\"option1\">\r\n            "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.name : stack1), depth0))
    + "\r\n        </label>\r\n    </div>\r\n\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"checkbox\">\r\n        <label>\r\n            <input type=\"checkbox\" value=\"\">\r\n            "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.name : stack1), depth0))
    + "\r\n        </label>\r\n    </div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},((stack1 = ((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.vote : stack1)) != null ? stack1.is_single : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});

this["JST"]["voteCollection"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"votes\">\r\n    <div class=\"votes-item-add\">\r\n        <a href=\"#votes/create\">Add new vote</a>\r\n    </div>\r\n    <div class=\"vote-items\" id=\"vote-items\">\r\n\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["VoteCommentAdd"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"vote-comment-add\">\r\n    <div class=\"vote-comment-avatar\">\r\n        <img src=\"/images/user.png\">\r\n    </div>\r\n    <div class=\"vote-comment-body\">\r\n    <div class=\"errors\"></div>\r\n        <textarea class=\"form-control js-comment-text\" rows=\"3\" placeholder=\"Comment...\"></textarea>\r\n        <div class=\"vote-comment-attachment\"><a>Attach</a></div>\r\n        <button class=\"btn btn-default js-confirm\">Add comment</button>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["voteCreateLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"vote-new\">\r\n    <div class=\"vote-new-head\">\r\n        <h4>My Question</h4>\r\n    </div>\r\n    <div class=\"vote-new-answers\">\r\n        <p>Answers</p>\r\n        <div id=\"vote-answers\">\r\n\r\n\r\n            <div class=\"vote-answer\">\r\n                <label for=\"answ1\">\r\n                    <input id=\"answ1\" type=\"checkbox\"> Answer one\r\n                </label>\r\n            </div>\r\n            <div class=\"vote-answer\">\r\n                <label for=\"answ2\">\r\n                    <input id=\"answ2\" type=\"checkbox\"> Answer two\r\n                </label>\r\n            </div>\r\n\r\n\r\n        </div>\r\n        <div class=\"vote-new-addAnswer\">\r\n            <button type=\"button\">\r\n                <span class=\"glyphicon glyphicon-plus-sign\" aria-hidden=\"true\"></span> Add Answer\r\n            </button>\r\n        </div>\r\n    </div>\r\n    <div class=\"vote-new-date\">\r\n        <p>Timeline</p>\r\n        <input type=\"text\" placeholder=\"Available from\"><input type=\"text\" placeholder=\"Available to\">\r\n    </div>\r\n    <div class=\"vote-new-access\">\r\n        <p>Access</p>\r\n        <div class=\"form-inline\">\r\n            <div class=\"form-group\">\r\n                <label for=\"public\">Public</label>\r\n                <input id=\"public\" name=\"access\" type=\"radio\">\r\n            </div>\r\n            <div class=\"form-group\">\r\n                <label for=\"private\">Private</label>\r\n                <input id=\"private\" name=\"access\" type=\"radio\">\r\n            </div>\r\n        </div>\r\n        <div class=\"vote-new-users\">\r\n            <p><small>Click to remove</small></p>\r\n            <div id=\"vote-access-users\">\r\n\r\n\r\n                <span>USer 1</span><span>User Nickname</span>\r\n\r\n\r\n            </div>\r\n        </div>\r\n        <div class=\"vote-new-addUsers\">\r\n            <input type=\"text\" placeholder=\"Add user..\">\r\n            <button><span class=\"glyphicon glyphicon-plus-sign\" aria-hidden=\"true\"></span> Add</button>\r\n        </div>\r\n    </div>\r\n    <div class=\"vote-new-attachment\" >\r\n        <div id=\"vote-attachments\">\r\n\r\n            <!-- Attachments -->\r\n\r\n        </div>\r\n        <a>Attach</a>\r\n    </div>\r\n    <div class=\"vote-new-control\">\r\n        <div class=\"vote-new-notification checkbox\">\r\n            <label><input type=\"checkbox\">Report me when someone post a reply</label>\r\n        </div>\r\n        <div class=\"vote-new-submit\">\r\n            <input type=\"submit\" value=\"Start Thread\">\r\n        </div>\r\n    </div>\r\n</div> ";
},"useData":true});

this["JST"]["voteDetail"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"vote\">\r\n    <div class=\"vote-bar hidden-xs\">\r\n        <div class=\"vote-avatar\">\r\n            <img src=\"/images/user.png\">\r\n        </div>\r\n        <div class=\"vote-addition\">\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"vote-body\">\r\n        <div id=\"vote-header\"></div>\r\n        <div id=\"answers\">\r\n\r\n        </div>\r\n        <div class=\"vote-attachments\">\r\n            Attachments\r\n        </div>\r\n        <div class=\"vote-comments\">\r\n            <h4 id=\"count\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.comments : stack1), depth0))
    + " Comments</h4>\r\n            <div id=\"add-comment\"></div>\r\n            <div id=\"comments\">\r\n\r\n\r\n            </div>\r\n            <div id=\"add-comment\"></div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n";
},"useData":true});

this["JST"]["voteDetailComment"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<!--<div class=\"vote-comment\">-->\r\n    <div class=\"vote-comment-avatar\">\r\n        <img src=\"/images/user.png\">\r\n    </div>\r\n    <div class=\"vote-comment-body\">\r\n        <h4>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.user : stack1)) != null ? stack1.first_name : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.user : stack1)) != null ? stack1.last_name : stack1), depth0))
    + " <span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.created_at : stack1), depth0))
    + "</span></h4>\r\n        <p class=\"vote-comment-text\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.content_origin : stack1), depth0))
    + "</p>\r\n    </div>\r\n    <div class=\"vote-comments\" id=\"comment-answer\">\r\n\r\n    </div>\r\n<!--</div>-->";
},"useData":true});

this["JST"]["voteHeader"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <a href=\"#votes/tags/"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" style=\"color: #333;\"><span>#"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span></a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<!--<div class=\"vote-head\">-->\r\n    <div class=\"vote-header\">\r\n        <h3>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
    + "</h3>\r\n        <h5>Opened by: "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.user : stack1)) != null ? stack1.first_name : stack1), depth0))
    + "  "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.user : stack1)) != null ? stack1.last_name : stack1), depth0))
    + "</h5>\r\n        <div class=\"vote-tags\"><p>\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.tags : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n    </div>\r\n\r\n<!--</div>-->";
},"useData":true});

this["JST"]["voteItem"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                <a href=\"#votes/tags/"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\" style=\"color: #333;\"><span>#"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</span></a>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"votes-item\">\r\n    <div class=\"votes-item-bar\">\r\n        <div class=\"votes-item-avatar\">\r\n            <img src=\"/images/user.png\">\r\n        </div>\r\n    </div>\r\n    <div class=\"votes-item-body\">\r\n        <div class=\"votes-item-title\">\r\n            <span><a id=\"label\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.title : stack1), depth0))
    + "</a></span> Opened by: <span> "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.user : stack1)) != null ? stack1.first_name : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.user : stack1)) != null ? stack1.last_name : stack1), depth0))
    + " </span>\r\n        </div>\r\n        <div class=\"votes-item-details\">\r\n            <a>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.comments : stack1), depth0))
    + " Comments</a><a>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.likes : stack1), depth0))
    + " likes</a>\r\n            <a>Finished at "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.finished_at : stack1), depth0))
    + "</a><a>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.views : stack1), depth0))
    + " Views</a>\r\n        </div>\r\n        <div class=\"votes-item-tags\">\r\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.tags : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\r\n        <!--<span class=\"votes-item-time\">Created at "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.model : depth0)) != null ? stack1.created_at : stack1), depth0))
    + "</span>-->\r\n    <span class=\"votes-item-time\">Asked "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.meta : depth0)) != null ? stack1.days_ago : stack1), depth0))
    + "</span>\r\n    </div>\r\n</div>\r\n";
},"useData":true});

this["JST"]["voteLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\r\n    <div class=\"container-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"create-topic pull-right\">\r\n                <button class=\"btn btn-warning btn-lg\">\r\n                    <span class=\"hidden-xs\">Create topic</span>\r\n                    <span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span>\r\n                </button>\r\n            </div>\r\n            <div class=\"clear\"></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"post-head\">\r\n        <div class=\"\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\">\r\n                    <div>Title</div>\r\n                </div>\r\n                <div class=\"col-sm-2 col-md-2 col-lg-2 hidden-xs\">\r\n                    <div class=\"text-center\">Finished at</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"posts\" id=\"posts\">\r\n        \r\n    </div>\r\n</div>";
},"useData":true});

return this["JST"];

};