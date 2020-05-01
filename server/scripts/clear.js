const db = require('../../database/index.js');

const clearOut = () => {
    //function to clear any existing data
    let tables = ['listings', 'dates', 'fees', 'occupants'];

    for (let i = 0; i < tables.length; i++) {
        db.connection.query(`DELETE FROM ${tables[i]}`, (err) => {
            if (err) {
                console.log(err);
            }
        })
    };
}

clearOut();

db.connection.end();

module.exports = {
    clearOut
}