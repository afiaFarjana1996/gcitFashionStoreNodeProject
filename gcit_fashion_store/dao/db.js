var mysql = require('mysql');
var CONFIG = require('../config')

var connection = mysql.createConnection({
    host     : CONFIG.db_host,
    user     : CONFIG.db_user,
    password : CONFIG.db_password,
    database :  CONFIG.db_name

    // host     : '127.0.0.1',
    // user     : 'root',
    // password : 'smoothstack',
    // database :  'fashion_store'
   
});

module.exports = connection;