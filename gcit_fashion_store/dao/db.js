var mysql = require('mysql');
var CONFIG = require('../config')

var connection = mysql.createConnection({
    host     : CONFIG.db_host,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database :  CONFIG.db_name
});

module.exports = connection;