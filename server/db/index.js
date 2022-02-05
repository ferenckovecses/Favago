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

database.getAllUser = () =>
{
    return new Promise((resolve, reject) => {

        conn.query(`SELECT * FROM user`, (err, results) => {
            if(err)
            {
                return reject(err);
            }
            //console.log(results[0].users)
            return resolve(results);
        });

    });
};

database.getSpecificUser = (id) =>
{
    return new Promise((resolve, reject) => {

        conn.query(`SELECT * FROM user WHERE id = ?`, [id],(err, results) => {
            if(err)
            {
                return reject(err);
            }
            //console.log(results[0].users)
            return resolve(results[0]);
        });

    });
};

module.exports = database;
