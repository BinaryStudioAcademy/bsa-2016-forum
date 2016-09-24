/**
 * dev config file must named as 'config.dev.js'
 * prod config file must named as 'config.prod.js'
 */

var config;

try
{
    config = require('./config.dev');
} catch (e){
    console.log("Develop config don`t exist");
    try {
        config = require('./config.prod');
    } catch (e)
    {
        console.log("Prod config also don`t exist");
        config = {
            socketPort: 3000,
            authUrl: "/api/v1/user/",
            authHost: "localhost",
            authPort: 8000
        };
    }
}

module.exports = config;