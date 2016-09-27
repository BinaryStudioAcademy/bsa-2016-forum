/**
 */
var http = require('http');
var config = require('./config');


module.exports = function (token, onSuccess) {

    var responseData = "";

    var options = {
        host: config.authHost,
        path: config.authUrl,
        port: config.authPort,
        headers: {
            'Accept': '/',
            'Cookie': "x-access-token=" + token
        }
    };

    var request = http.get(options);

    try {
        request.on('response', function (response) {
            response.on('end', function () {
                var data = JSON.parse(responseData).data;
                onSuccess(data);
            });

            response.on('data', function (chunk) {
                responseData += chunk;
            });
        });

        request.on('error', function (e) {
            console.log(e.message);
        });

        request.end();
        
    } catch (error) {
        console.log(error);
    }
};