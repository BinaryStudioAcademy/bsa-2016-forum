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

this["JST"]["header"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"hdr-header\"><img id=\"BSheaderLogo\" src=\"http://academy.binary-studio.com/resources/logo.png\"\r\n                             class=\"hdr-logo\"/>\r\n    <div>\r\n        <div class=\"hdr-buttons\"><input id=\"searchBar\" placeholder=\"Search\"/><a id=\"userLink\"\r\n                                                                                class=\"hdr-noTextDecoration\">\r\n            <div id=\"userProfile\"><img id=\"avatar\" class=\"hdr-avatar\"/><span id=\"userName\"></span><span\r\n                    id=\"profileBarArrDwn\"></span></div>\r\n        </a>\r\n            <button id=\"appsBtn\" class=\"hdr-button\"><img src=\"http://team.binary-studio.com/app/images/Thumbnails.png\"\r\n                                                         class=\"hdr-appsLogo\"/></button>\r\n            <button id=\"notificationBtn\" class=\"hdr-button\"><img src=\"http://team.binary-studio.com/app/images/bell.png\"\r\n                                                                 class=\"hdr-appsLogo\"/></button>\r\n        </div>\r\n        <div id=\"notificationCounter\" class=\"hdr-invisible\"></div>\r\n        <div id=\"search\"></div>\r\n    </div>\r\n</div>\r\n<div id=\"logOutBox\" class=\"hdr-invisible hdr-headerElements\">\r\n    <div id=\"userprofileBtnInBox\" class=\"hdr-logOutButtons\">\r\n        <button id=\"userProfileInBoxBtn\" class=\"hdr-userprofileAndLogoutBtn hdr-button\"><img\r\n                src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABFUlEQVRIS82V3RHBQBSFv3SgA1RACVSACtABFaACJdABHdABKkAHSjAnk+QhdrM3MXbcl8yE3e+e+3OSECGSCAzqQAbAFOhkiZ2BjSVJK2QBbB0XPjLQvgpmgSjzeyDjLiCgMyyQGbALQFS29TcQHV79GhJFiabqFFAyBDRtjXvSBy7/0Pg54B1jy3S1slL0PGpugEr6+qZcOlvV/EoVOmxRkieoZWuXsn0C6plXRV2Ia18qlzBPqI6SKJAjMCqVS+8mISe2KJFByoHHnssEWjY1SI2lPEtPS+Tfl4/NdynRXhxqXF5OQBCVsJg4F+QK+BbPokj/EUh+lkYZYjFDK6gwTRfE2oMQTGrS/limK3RZ8PcokDcWljAaGF/vbwAAAABJRU5ErkJggg==\"\r\n                class=\"hdr-userprofileAndLogoutImg\"/><span>Profile</span></button>\r\n    </div>\r\n    <div id=\"logOutBtnInBox\" class=\"hdr-logOutButtons\">\r\n        <button id=\"logOutButton\" class=\"hdr-userprofileAndLogoutBtn hdr-button\"><img\r\n                src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAx0lEQVRIS+2V0Q3CQAxDXydgBGATRqEbwEQwCiPABrBBmQBklEqhKpwruC+4n/uoYydOrmmofJrK/GSBFbADFqboGWiBwzt8FlDA3CTvYYpZugK3ALq2WfhMZgWkbC38bwtY8/CJRUOBPbABuvzhmwJq+jHehu7HcQT6abEsiQq2gCqqInANq2wBN3NVegLWYZVtkStQvcmjiThNflXB/1dR7O1ki/TEZ0XaZ8CltAGHK1Oj5m41kWvm7ZU5MXkP7q5Hj20EdQcvdDIZh0O7hwAAAABJRU5ErkJggg==\"\r\n                class=\"hdr-userprofileAndLogoutImg\"/><span>Logout</span></button>\r\n    </div>\r\n</div>\r\n<div id=\"appsBlock\" class=\"hdr-invisible\">\r\n    <div id=\"appsList\"></div>\r\n</div>\r\n<div id=\"notificationBlock\" class=\"hdr-invisible\">\r\n    <ul id=\"notificationList\"></ul>\r\n    <a id=\"readAllBtn\" href=\"\" class=\"hdr-noTextDecoration hdr-specialNotifBtn\"><img width=\"20\" height=\"20\"\r\n                                                                                     src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABkElEQVRIS+2U7S0EURSGn60AHVABKqADdLAqQAWoABWgAlSACtABFaAC8kzOK9dmZzP+bEScZJLdO+e8X/feGTGHGs2Bg3+SH6X8a+LaBLaAtXoWgTfgsZ5r4H6WtVlOxsAhdIfjArgrUAkkklQB+8ArcARcTiObRuLwOfAObADrBe6873R1M7H2UG4WgN3mXcc5SaIalfk8lzrVWjqTPCWYDi1dOrsMnFYCZ2lsSRxQ6XZDYJ/DljGpNKWIlfqTnhC5T7pTyJeTKNKBYC14H8lLKZ/W657p6EMinWSDoypKdSTp0LgE1UFbXeSJSyeyHjRObLZJMo+rlTgFy5oinHc/Ujo5qaTGk3uyCuwUuAMSGJdAibFVKvBtiYsL166Ap0qp93QZYYb8bRR7dUx1J5BHWQG6z54qyhN4XDOdoL574pAXzGaPp6ACCuIJ8w4pwjVJderFXSr1ibKXJHHoQBDJBJTMCHLjjVZwiQW3N46+7f6QD2SA8u2Kk/bbpYDeGkIya37Qu3+SQTGl6e/E9QlOFWJ6RtIuVwAAAABJRU5ErkJggg==\"/></a><a\r\n        href=\"http://team.binary-studio.com/app/#/\" class=\"hdr-noTextDecoration hdr-specialNotifBtn\"><img width=\"20\"\r\n                                                                                                          height=\"20\"\r\n                                                                                                          src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB30lEQVRYR+2W7VHCQBCGoQK1A60ArECsQK1ArECtAKwArMBYgXYAVqBWoFagVqDvw+w6R8jlQ0jyh5vZ4QJ3+z63Hxe6nZZHt2X9zhaACIxlP22lAgDEX2VfDUPsSq/nAMd6mDcMMJDezAGu9TBtGIDUjxwA7UR20RAEWudoOcCN5leyBxnRqKseyPudjJQT8b8I8AWi1MGbLdg0BOIz2YGM/C+e00XIl0DQGaTjZUMp6Vt0v02cwwGxAoAeEI+ynkViXQjEOfmTbGiRRicK4IdONDmRURPM/zMQJOf3Jh76KARgMYU5kZGOqhC+N9bipQCA8FMAULZNWUub5YGXBgDCHVIbOI11iLfZqe3JAy4FkO5bovEp87YNc+pttmfipIDiiwEXAlC9FBAOORHd4G26Y47nRoAzLrEPGXMixH4iBnBWS+cCIIg4b0nmYciBSGR0yLsB7OuTSufUWWuPDAIgH1GAqVZcyriex8GG9BRR4Bg4dpisLfgZmT/8MlYACDFhPJQNzWmOfuWfvDCftfNMtrigwtcxp+aqRHzd2y9Gh2gio4ZuZZPwdZyVw8rHLLEhrKGl1zF5anKgt/Q6njepLq1BWAPkPHa71cVFKvr+t7wukUK/ALQ6tgCtR+AX0EuQCjZ0KYUAAAAASUVORK5CYII=\"/></a><a\r\n        href=\"http://team.binary-studio.com/app/#/settings\" class=\"hdr-noTextDecoration hdr-specialNotifBtn\"><img\r\n        width=\"20\" height=\"20\"\r\n        src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACL0lEQVRYR9WXgVHDMAxF2wlgA8oEwASUDcoElAmADdIJgAkoE9BOQDegbFAmACYAPc7OqYocJ21zPXTna2NbX1+yJCf93mbyIGo3RnUiz0VbuH5bhbB/Ib/nRncuz6O2eJsS+BRDh8bYSp6Pd0XgVIBeZNzJmBlQDEPAE88honIv41LG0ip5Chh/VR5OA5GvoMzZkwOeXMsk+xGIYngcntG/sCQsAWs8GlkFYMAGCeN6LwTZC56WCglLAENHGQPbLr9rYpbAUBYJf5fCMSyiAS8HvBrfFaFHAbrVYB4BkgeGJ7uyGnDWQl8XAda6iAIlXameVCPyGo0NCB7FuibbcxEjwSuNyhIg/FceU2X9W/4Xzh7OlvmDmqMbyxotO/aUHgRoFnjAsO3Vw9LNxq5DArycQIDoLSHwk9ut1t1EMvoA546jVGlL4Fk0CWOdTGWRY2wk/44A4T3LuPYW8qlxBIqgQBI2uQfceg7Wmibhh05CyzQHQgZDmraqhWua+bpKqlRQqhGtGkTjr4wCg1jGdWHH64HdkCKw11ZMCEmkCttGWZXeRLS4issuyFYvAk8yP97SWEo9ex2PRJOX0S6Fl9NZNLCPV7K1ZPReShfCzt5o3AFTGZRorldggCTmGO2dwE06lBGrx80BSkqTsOcGMHniia1zXU0V4wCkyhAS0WPIaKFK2nyY4DFY5FfpeQRMEUg4WE5TSvaY3EaTA9qUAFHZ68ep1yknQqrIeWzXfwFZJHIs2+DwVAAAAABJRU5ErkJggg==\"/></a>\r\n</div>";
},"useData":true});

this["JST"]["navigationMenu"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"menu-container\">\r\n    <div class=\"container\">\r\n        <nav class=\"navbar\" id=\"menu\">\r\n            <!-- <div class=\"container-fluid\"> -->\r\n            <div class=\"navbar-header\">\r\n                <button type=\"button\" class=\"btn btn-navbar navbar-toggle btn-lg\"\r\n                        data-toggle=\"collapse\" data-target=\".navbar-ex1-collapse\">\r\n                    <span class=\"glyphicon glyphicon-align-justify\"></span>\r\n                </button>\r\n            </div>\r\n            <div class=\"navbar-collapse navbar-ex1-collapse collapse\" aria-expanded=\"true\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li class=\"active\"><a href=\"\">Topics</a></li>\r\n                    <li><a href=\"\">Users</a></li>\r\n                    <li><a href=\"\">Subscribes</a></li>\r\n                    <li><a href=\"\">Votes</a></li>\r\n                    <li><a href=\"\">Notifications</a></li>\r\n                </ul>\r\n            </div>\r\n            <!-- </div> -->\r\n        </nav>\r\n\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["mainLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"header\"></div>\r\n<div id=\"navigationMenu\"></div>\r\n<div class=\"container\">\r\n    <div class=\"breadcrumbs-container\" id=\"breadcrumbs\">\r\n        <ol class=\"breadcrumb\">\r\n            <li><a href=\"#\"></a></li>\r\n        </ol>\r\n    </div>\r\n    <div class=\"content-container\">\r\n        <div class=\"content-container-main\" id=\"main-content\">\r\n\r\n        </div>\r\n        <div class=\"content-container-bar hidden-xs\" id=\"bar-content\">\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"footer\"></div>\r\n\r\n";
},"useData":true});

this["JST"]["topicCollection"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div>\r\n    <div class=\"container-fluid\">\r\n        <div class=\"row\">\r\n            <div class=\"create-topic pull-right\">\r\n                <button class=\"btn btn-warning btn-lg\">\r\n                    <span class=\"hidden-xs\">Create topic</span>\r\n                    <span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span>\r\n                </button>\r\n            </div>\r\n            <div class=\"clear\"></div>\r\n        </div>\r\n    </div>\r\n    <div class=\"post-head\">\r\n        <div class=\"\">\r\n            <div class=\"row\">\r\n                <div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\">\r\n                    <div>Title</div>\r\n                </div>\r\n                <div class=\"col-sm-2 col-md-2 col-lg-2 hidden-xs\">\r\n                    <div class=\"text-center\">User</div>\r\n                </div>\r\n                <div class=\"col-sm-2 col-md-2 col-lg-2 hidden-xs\">\r\n                    <div class=\"text-center\">Views</div>\r\n                </div>\r\n                <div class=\"col-sm-1 col-md-1 col-lg-1 hidden-xs\">\r\n                    <div class=\"text-center\">Answers</div>\r\n                </div>\r\n                <div class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\">\r\n                    <div class=\"text-center\">Date</div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"posts\" id=\"posts\">\r\n\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["topicComment"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"topic-comment\">\r\n    <div class=\"topic-comment-flex\">\r\n        <div class=\"topic-bar hidden-xs\">\r\n            <div class=\"topic-avatar\">\r\n                <img src=\"/images/user.png\">\r\n            </div>\r\n            <div class=\"topic-addition\">\r\n\r\n            </div>\r\n        </div>\r\n        <div class=\"topic-body\">\r\n            <div class=\"topic-msg\">\r\n                <div id=\"includedComment\">\r\n\r\n                </div>\r\n                <p>Even though a field is marked as 'editable=False' in the model, I would like the admin page to display it. Currently it hides the field altogether.. How can this be achieved ?</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"topic-control\">\r\n        <div class=\"topic-history-margin hidden-xs\"></div>\r\n        <div class=\"topic-history\">P: 21 Nov 9:43 U: usernik</div>\r\n        <div class=\"topic-control-btn\">\r\n            <a>Edit</a><a>Share</a><a>Reply</a><a>notification</a>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["topicCreateNew"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"topic-new\">\r\n    <div class=\"topic-new-head\">\r\n        <h4>Create New Thread</h4>\r\n    </div>\r\n    <div class=\"topic-new-title\">\r\n        <input type=\"text\" placeholder=\"Enter Topic Title\">\r\n    </div>\r\n    <div class=\"topic-new-body\">\r\n        <textarea rows=\"7\"></textarea>\r\n        <div class=\"topic-new-attachment\">\r\n            <a>Attach</a>\r\n        </div>\r\n    </div>\r\n    <div class=\"topic-new-control\">\r\n        <div class=\"topic-new-notification checkbox\">\r\n            <label><input type=\"checkbox\">Report me when someone post a reply</label>\r\n        </div>\r\n        <div class=\"topic-new-submit\">\r\n            <input type=\"submit\" value=\"Start Thread\">\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["topicDetail"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"topic\">\r\n    <div class=\"topic-head topic-comment\">\r\n        <div class=\"topic-comment-flex\">\r\n            <div class=\"topic-bar hidden-xs\">\r\n                <div class=\"topic-avatar topic-avatar-border\">\r\n                    <img src=\"/images/user.png\">\r\n                </div>\r\n                <div class=\"topic-addition\">\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"topic-body\">\r\n                <div class=\"topic-header\">\r\n                    <h4>Question title</h4>\r\n                </div>\r\n                <div class=\"topic-msg\">\r\n                    <p>Description</p><p>I am wondering which is the correct way to do this. I have a third party app, django cities light that gives me some nice models with the cities of the world. However the admin shows the form labels in english, I'd like to translate them to spanish.</p><p>I could go to the models in lib>python2.7>dit-packages>cities_light>abstract_models.py get the AbstractCity provided by the package and set custom verbose_names there. But everytime I update the library, I will lose my changes.</p><p>Is there a correct way to do this so that I won't lose changes on every update?</p>\r\n                </div>\r\n                <div class=\"topic-tags\">\r\n                    <span>#movie</span><span>#cinema</span>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"topic-control\">\r\n            <div class=\"topic-bar hidden-xs\"></div>\r\n            <div class=\"topic-history\">P: 21 Nov 9:43 U: usernik</div>\r\n            <div class=\"topic-control-btn\">\r\n                <a>Edit</a><a>Share</a><a>Answer</a><a>notification</a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"topic-comments\" id=\"topic-comments\">\r\n\r\n    </div>\r\n    <a class=\"topic-more\">Load more</a>\r\n    <div class=\"topic-comment\">\r\n        <div class=\"topic-comment-flex\">\r\n            <div class=\"topic-bar hidden-xs\">\r\n                <div class=\"topic-avatar\">\r\n                    <img src=\"/images/user.png\">\r\n                </div>\r\n                <div class=\"topic-addition\">\r\n\r\n                </div>\r\n            </div>\r\n            <div class=\"topic-body\">\r\n                <textarea class=\"form-control\" rows=\"3\" placeholder=\"Comment...\"></textarea>\r\n                <div class=\"topic-attachment\"><a>Attach</a></div>\r\n            </div>\r\n        </div>\r\n        <div class=\"topic-control\">\r\n            <div class=\"topic-control-btn topic-control-add\">\r\n                <button class=\"btn btn-default\">Add comment</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["topicItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"container-fluid\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-6 col-sm-6 col-md-6 col-lg-6\">\r\n            <div class=\"post-title\">"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</div>\r\n        </div>\r\n        <div class=\"col-sm-2 col-md-2 col-lg-2 hidden-xs\">\r\n            <div class=\"text-center\">"
    + alias4(((helper = (helper = helpers.rating || (depth0 != null ? depth0.rating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rating","hash":{},"data":data}) : helper)))
    + "</div>\r\n        </div>\r\n        <div class=\"col-sm-2 col-md-2 col-lg-2 hidden-xs\">\r\n            <div class=\"text-center\">"
    + alias4(((helper = (helper = helpers.reviewed_number || (depth0 != null ? depth0.reviewed_number : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reviewed_number","hash":{},"data":data}) : helper)))
    + "</div>\r\n        </div>\r\n        <div class=\"col-sm-1 col-md-1 col-lg-1 hidden-xs\">\r\n            <div class=\"text-center\">1</div>\r\n        </div>\r\n        <div class=\"col-xs-1 col-sm-1 col-md-1 col-lg-1\">\r\n            <div class=\"text-center\">30.08.2016</div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"useData":true});

this["JST"]["topicLayout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "";
},"useData":true});

this["JST"]["voteCollection"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"votes\">\r\n    <div class=\"votes-item-add\">\r\n        <a href=\"#\">add new vote</a>\r\n    </div>\r\n    <div class=\"vote-items\" id=\"vote-items\">\r\n\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["voteDetail"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"vote\">\r\n    <div class=\"vote-bar hidden-xs\">\r\n        <div class=\"vote-avatar\">\r\n            <img src=\"/images/user.png\">\r\n        </div>\r\n        <div class=\"vote-addition\">\r\n\r\n        </div>\r\n    </div>\r\n    <div class=\"vote-body\">\r\n        <div class=\"vote-head\">\r\n            <div class=\"vote-header\">\r\n                <h3>Question title</h3>\r\n                <h5>@author   logs</h5>\r\n                <div class=\"vote-tags\">\r\n                    <span>#movie</span><span>#cinema</span>\r\n                </div>\r\n            </div>\r\n            <div class=\"vote-control\">\r\n                <a>Edite</a><a>Share</a>\r\n            </div>\r\n        </div>\r\n        <div class=\"vote-question\">\r\n            <p>This should activate links by clicking without any javascript functions needed and will also automa</p>\r\n            <div class=\"checkbox\">\r\n                <label>\r\n                    <input type=\"checkbox\" value=\"\">\r\n                    Option one is this and that&mdash;be sure to include why it's great\r\n                </label>\r\n            </div>\r\n            <div class=\"checkbox disabled\">\r\n                <label>\r\n                    <input type=\"checkbox\" value=\"\" disabled>\r\n                    Option two is disabled\r\n                </label>\r\n            </div>\r\n            <div class=\"radio\">\r\n                <label>\r\n                    <input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios1\" value=\"option1\" checked>\r\n                    Option one is this and that&mdash;be sure to include why it's great\r\n                </label>\r\n            </div>\r\n            <div class=\"radio\">\r\n                <label>\r\n                    <input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios2\" value=\"option2\">\r\n                    Option two can be something else and selecting it will deselect option one\r\n                </label>\r\n            </div>\r\n            <div class=\"radio disabled\">\r\n                <label>\r\n                    <input type=\"radio\" name=\"optionsRadios\" id=\"optionsRadios3\" value=\"option3\" disabled>\r\n                    Option three is disabled\r\n                </label>\r\n            </div>\r\n        </div>\r\n        <div class=\"vote-attachments\">\r\n            Attachments\r\n        </div>\r\n        <div class=\"vote-comments\">\r\n            <h4>N Comments</h4>\r\n            <div class=\"vote-comment\">\r\n                <div class=\"vote-comment-avatar\">\r\n                    <img src=\"/images/user.png\">\r\n                </div>\r\n                <div class=\"vote-comment-body\">\r\n                    <h4>User <span>3 hours ago</span></h4>\r\n                    <p class=\"vote-comment-text\">This should activate links by clicking without any javascript functions needed and will also automatically activate each link as you scroll through the corresponding linked sections of the page which a js onclick() will not.</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"vote-comment\">\r\n                <div class=\"vote-comment-avatar\">\r\n                    <img src=\"/images/user.png\">\r\n                </div>\r\n                <div class=\"vote-comment-body\">\r\n                    <h4>User <span>3 hours ago</span></h4>\r\n                    <p class=\"vote-comment-text\">This should activate links by clicking without any javascript functions needed and will also automatically activate each link as you scroll through the corresponding linked sections of the page which a js onclick() will not.</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"vote-comment\">\r\n                <div class=\"vote-comment-avatar\">\r\n                    <img src=\"/images/user.png\">\r\n                </div>\r\n                <div class=\"vote-comment-body\">\r\n                    <h4>User <span>3 hours ago</span></h4>\r\n                    <p class=\"vote-comment-text\">This should activate links by clicking without any javascript functions needed and will also automatically activate each link as you scroll through the corresponding linked sections of the page which a js onclick() will not.</p>\r\n                </div>\r\n            </div>\r\n            <div class=\"vote-comment-add\">\r\n                <div class=\"vote-comment-avatar\">\r\n                    <img src=\"/images/user.png\">\r\n                </div>\r\n                <div class=\"vote-comment-body\">\r\n                    <textarea class=\"form-control\" rows=\"3\" placeholder=\"Comment...\"></textarea>\r\n                    <div class=\"vote-comment-attachment\"><a>Attach</a></div>\r\n                    <button class=\"btn btn-default\">Add comment</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["voteDetailComment"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"vote-comment\">\r\n    <div class=\"vote-comment-avatar\">\r\n        <img src=\"/images/user.png\">\r\n    </div>\r\n    <div class=\"vote-comment-body\">\r\n        <h4>User <span>3 hours ago</span></h4>\r\n        <p class=\"vote-comment-text\">This should activate links by clicking without any javascript functions needed and will also automatically activate each link as you scroll through the corresponding linked sections of the page which a js onclick() will not.</p>\r\n    </div>\r\n    <div class=\"vote-comments\" id=\"comment-answer\">\r\n\r\n    </div>\r\n</div>";
},"useData":true});

this["JST"]["voteItem"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"votes-item\">\r\n    <div class=\"votes-item-bar\">\r\n        <div class=\"votes-item-avatar\">\r\n            <img src=\"/images/user.png\">\r\n        </div>\r\n    </div>\r\n    <div class=\"votes-item-body\">\r\n        <div class=\"votes-item-title\">\r\n            <span>Vote title</span>\r\n        </div>\r\n        <div class=\"votes-item-details\">\r\n            <a>0 Comments</a><a>0 Votes</a><a>0 Views</a>\r\n        </div>\r\n        <div class=\"votes-item-tags\">\r\n            <span>#Vote</span><span>#Votes</span><span>#Vote</span>\r\n        </div>\r\n        <span class=\"votes-item-time\">Asked 1 day ago</span>\r\n    </div>\r\n</div>";
},"useData":true});

return this["JST"];

};