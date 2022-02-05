const mysql = require('mysql');

const conn = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'favago',
    host: 'localhost',
    port: '3306'
});

let database = {};

database.all = () =>
{
    return new Promise((resolve, reject) => {

        conn.query(`SELECT * FROM user`, (err, results) => {
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        });

    });
};

module.exports = database;