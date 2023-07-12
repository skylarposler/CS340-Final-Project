/*Citation for backend connection
5/23/2023
OneStopAnime - Made with REACT
Copied Source Code from here: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/Step%201%20-%20Connecting%20to%20a%20MySQL%20Database and replaced with individual database info.*/

var mysql = require('mysql');

var pool = mysql.createPool({
    host            : 'classmysql.engr.oregonstate.edu',
    user            : '',
    password        : '',
    database        : 'cs340_poslert'
});

module.exports.pool = pool;