const mysql = require('mysql');

module.exports.connection = mysql.createConnection({
    user: "student",
    password: "student",
    database: "reservations"
})

module.exports.connection.connect(function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log('hacking into the database');
    }
});

