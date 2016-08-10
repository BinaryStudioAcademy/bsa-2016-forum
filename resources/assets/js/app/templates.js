module.exports = function(Handlebars) {

this["JST"] = this["JST"] || {};

this["JST"]["header.tpl"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"hdr-header\"><img id=\"BSheaderLogo\" src=\"http://academy.binary-studio.com/resources/logo.png\"\r\n                             class=\"hdr-logo\"/>\r\n    <div>\r\n        <div class=\"hdr-buttons\"><input id=\"searchBar\" placeholder=\"Search\"/><a id=\"userLink\"\r\n                                                                                class=\"hdr-noTextDecoration\">\r\n            <div id=\"userProfile\"><img id=\"avatar\" class=\"hdr-avatar\"/><span id=\"userName\"></span><span\r\n                    id=\"profileBarArrDwn\"></span></div>\r\n        </a>\r\n            <button id=\"appsBtn\" class=\"hdr-button\"><img src=\"http://team.binary-studio.com/app/images/Thumbnails.png\"\r\n                                                         class=\"hdr-appsLogo\"/></button>\r\n            <button id=\"notificationBtn\" class=\"hdr-button\"><img src=\"http://team.binary-studio.com/app/images/bell.png\"\r\n                                                                 class=\"hdr-appsLogo\"/></button>\r\n        </div>\r\n        <div id=\"notificationCounter\" class=\"hdr-invisible\"></div>\r\n        <div id=\"search\"></div>\r\n    </div>\r\n</div>\r\n<div id=\"logOutBox\" class=\"hdr-invisible hdr-headerElements\">\r\n    <div id=\"userprofileBtnInBox\" class=\"hdr-logOutButtons\">\r\n        <button id=\"userProfileInBoxBtn\" class=\"hdr-userprofileAndLogoutBtn hdr-button\"><img\r\n                src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABFUlEQVRIS82V3RHBQBSFv3SgA1RACVSACtABFaACJdABHdABKkAHSjAnk+QhdrM3MXbcl8yE3e+e+3OSECGSCAzqQAbAFOhkiZ2BjSVJK2QBbB0XPjLQvgpmgSjzeyDjLiCgMyyQGbALQFS29TcQHV79GhJFiabqFFAyBDRtjXvSBy7/0Pg54B1jy3S1slL0PGpugEr6+qZcOlvV/EoVOmxRkieoZWuXsn0C6plXRV2Ia18qlzBPqI6SKJAjMCqVS+8mISe2KJFByoHHnssEWjY1SI2lPEtPS+Tfl4/NdynRXhxqXF5OQBCVsJg4F+QK+BbPokj/EUh+lkYZYjFDK6gwTRfE2oMQTGrS/limK3RZ8PcokDcWljAaGF/vbwAAAABJRU5ErkJggg==\"\r\n                class=\"hdr-userprofileAndLogoutImg\"/><span>Profile</span></button>\r\n    </div>\r\n    <div id=\"logOutBtnInBox\" class=\"hdr-logOutButtons\">\r\n        <button id=\"logOutButton\" class=\"hdr-userprofileAndLogoutBtn hdr-button\"><img\r\n                src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAx0lEQVRIS+2V0Q3CQAxDXydgBGATRqEbwEQwCiPABrBBmQBklEqhKpwruC+4n/uoYydOrmmofJrK/GSBFbADFqboGWiBwzt8FlDA3CTvYYpZugK3ALq2WfhMZgWkbC38bwtY8/CJRUOBPbABuvzhmwJq+jHehu7HcQT6abEsiQq2gCqqInANq2wBN3NVegLWYZVtkStQvcmjiThNflXB/1dR7O1ki/TEZ0XaZ8CltAGHK1Oj5m41kWvm7ZU5MXkP7q5Hj20EdQcvdDIZh0O7hwAAAABJRU5ErkJggg==\"\r\n                class=\"hdr-userprofileAndLogoutImg\"/><span>Logout</span></button>\r\n    </div>\r\n</div>\r\n<div id=\"appsBlock\" class=\"hdr-invisible\">\r\n    <div id=\"appsList\"></div>\r\n</div>\r\n<div id=\"notificationBlock\" class=\"hdr-invisible\">\r\n    <ul id=\"notificationList\"></ul>\r\n    <a id=\"readAllBtn\" href=\"\" class=\"hdr-noTextDecoration hdr-specialNotifBtn\"><img width=\"20\" height=\"20\"\r\n                                                                                     src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABkElEQVRIS+2U7S0EURSGn60AHVABKqADdLAqQAWoABWgAlSACtABFaAC8kzOK9dmZzP+bEScZJLdO+e8X/feGTGHGs2Bg3+SH6X8a+LaBLaAtXoWgTfgsZ5r4H6WtVlOxsAhdIfjArgrUAkkklQB+8ArcARcTiObRuLwOfAObADrBe6873R1M7H2UG4WgN3mXcc5SaIalfk8lzrVWjqTPCWYDi1dOrsMnFYCZ2lsSRxQ6XZDYJ/DljGpNKWIlfqTnhC5T7pTyJeTKNKBYC14H8lLKZ/W657p6EMinWSDoypKdSTp0LgE1UFbXeSJSyeyHjRObLZJMo+rlTgFy5oinHc/Ujo5qaTGk3uyCuwUuAMSGJdAibFVKvBtiYsL166Ap0qp93QZYYb8bRR7dUx1J5BHWQG6z54qyhN4XDOdoL574pAXzGaPp6ACCuIJ8w4pwjVJderFXSr1ibKXJHHoQBDJBJTMCHLjjVZwiQW3N46+7f6QD2SA8u2Kk/bbpYDeGkIya37Qu3+SQTGl6e/E9QlOFWJ6RtIuVwAAAABJRU5ErkJggg==\"/></a><a\r\n        href=\"http://team.binary-studio.com/app/#/\" class=\"hdr-noTextDecoration hdr-specialNotifBtn\"><img width=\"20\"\r\n                                                                                                          height=\"20\"\r\n                                                                                                          src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB30lEQVRYR+2W7VHCQBCGoQK1A60ArECsQK1ArECtAKwArMBYgXYAVqBWoFagVqDvw+w6R8jlQ0jyh5vZ4QJ3+z63Hxe6nZZHt2X9zhaACIxlP22lAgDEX2VfDUPsSq/nAMd6mDcMMJDezAGu9TBtGIDUjxwA7UR20RAEWudoOcCN5leyBxnRqKseyPudjJQT8b8I8AWi1MGbLdg0BOIz2YGM/C+e00XIl0DQGaTjZUMp6Vt0v02cwwGxAoAeEI+ynkViXQjEOfmTbGiRRicK4IdONDmRURPM/zMQJOf3Jh76KARgMYU5kZGOqhC+N9bipQCA8FMAULZNWUub5YGXBgDCHVIbOI11iLfZqe3JAy4FkO5bovEp87YNc+pttmfipIDiiwEXAlC9FBAOORHd4G26Y47nRoAzLrEPGXMixH4iBnBWS+cCIIg4b0nmYciBSGR0yLsB7OuTSufUWWuPDAIgH1GAqVZcyriex8GG9BRR4Bg4dpisLfgZmT/8MlYACDFhPJQNzWmOfuWfvDCftfNMtrigwtcxp+aqRHzd2y9Gh2gio4ZuZZPwdZyVw8rHLLEhrKGl1zF5anKgt/Q6njepLq1BWAPkPHa71cVFKvr+t7wukUK/ALQ6tgCtR+AX0EuQCjZ0KYUAAAAASUVORK5CYII=\"/></a><a\r\n        href=\"http://team.binary-studio.com/app/#/settings\" class=\"hdr-noTextDecoration hdr-specialNotifBtn\"><img\r\n        width=\"20\" height=\"20\"\r\n        src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACL0lEQVRYR9WXgVHDMAxF2wlgA8oEwASUDcoElAmADdIJgAkoE9BOQDegbFAmACYAPc7OqYocJ21zPXTna2NbX1+yJCf93mbyIGo3RnUiz0VbuH5bhbB/Ib/nRncuz6O2eJsS+BRDh8bYSp6Pd0XgVIBeZNzJmBlQDEPAE88honIv41LG0ip5Chh/VR5OA5GvoMzZkwOeXMsk+xGIYngcntG/sCQsAWs8GlkFYMAGCeN6LwTZC56WCglLAENHGQPbLr9rYpbAUBYJf5fCMSyiAS8HvBrfFaFHAbrVYB4BkgeGJ7uyGnDWQl8XAda6iAIlXameVCPyGo0NCB7FuibbcxEjwSuNyhIg/FceU2X9W/4Xzh7OlvmDmqMbyxotO/aUHgRoFnjAsO3Vw9LNxq5DArycQIDoLSHwk9ut1t1EMvoA546jVGlL4Fk0CWOdTGWRY2wk/44A4T3LuPYW8qlxBIqgQBI2uQfceg7Wmibhh05CyzQHQgZDmraqhWua+bpKqlRQqhGtGkTjr4wCg1jGdWHH64HdkCKw11ZMCEmkCttGWZXeRLS4issuyFYvAk8yP97SWEo9ex2PRJOX0S6Fl9NZNLCPV7K1ZPReShfCzt5o3AFTGZRorldggCTmGO2dwE06lBGrx80BSkqTsOcGMHniia1zXU0V4wCkyhAS0WPIaKFK2nyY4DFY5FfpeQRMEUg4WE5TSvaY3EaTA9qUAFHZ68ep1yknQqrIeWzXfwFZJHIs2+DwVAAAAABJRU5ErkJggg==\"/></a>\r\n</div>";
},"useData":true});

return this["JST"];

};