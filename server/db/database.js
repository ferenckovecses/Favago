const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { sendStatus } = require('express/lib/response');
const res = require('express/lib/response');

//Database config
const password = '';
const username = 'root';
const host = 'localhost';
const port = '3306'
const db = 'favago';
const charset = 'utf8_hungarian_ci';
let initStatus = false;

const conn = mysql.createConnection({
    password: password,
    user: username,
    host: host,
    port: port,
});

let database = {};


//Creates the Database and make a connecton to it
database.CreateDatabase = () =>
{
    conn.query("CREATE DATABASE IF NOT EXISTS ?? CHARACTER SET utf8 COLLATE ??", [db, charset], function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log("Database created");
    });

    //Change to created database
    conn.changeUser({ database : db}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Database changed to: ", db);
        initStatus = true;
    })
    
}

database.CreateDatabase();

//Creates the tables in the database
database.Init = () =>
{
    return new Promise((resolve, reject) => {

        //Create hotel table
        conn.query(`CREATE TABLE IF NOT EXISTS hotel (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(100) NOT NULL,
            city varchar(100) NOT NULL,
            PRIMARY KEY (id))`, (err, results) => {
            if(err)
            {
                return reject(err);
            }
            console.log("Hotel table created!");
        });

        //Create guest table
        conn.query(`CREATE TABLE IF NOT EXISTS guest ( 
            id INT NOT NULL AUTO_INCREMENT ,  
            firstName VARCHAR(100) NOT NULL ,  
            lastName VARCHAR(100) NOT NULL ,  
            email VARCHAR(100) NOT NULL ,  
            password TEXT NOT NULL ,    
            PRIMARY KEY  (id),    
            UNIQUE  (email))`, (err, results) => {
            if(err)
            {
                return reject(err);
            }
            console.log("User table created!");
        });

        //Create room table
        conn.query(`CREATE TABLE IF NOT EXISTS room ( 
            id INT NOT NULL AUTO_INCREMENT ,  
            name VARCHAR(100) NOT NULL ,  
            price INT NOT NULL ,
            description TEXT,  
            hotelID INT NOT NULL ,    
            PRIMARY KEY  (id),
            FOREIGN KEY (hotelID) REFERENCES Favago.hotel(id))`, (err, results) => {
            if(err)
            {
                return reject(err);
            }
            console.log("Room table created!");
        });

        //Create reservation table
        conn.query(`CREATE TABLE IF NOT EXISTS reservation ( 
            id INT NOT NULL AUTO_INCREMENT ,  
            hotelID INT NOT NULL ,  
            userID INT NOT NULL ,  
            startDate DATE NOT NULL ,
            endDate DATE NOT NULL ,    
            PRIMARY KEY  (id),
            FOREIGN KEY (hotelID) REFERENCES ??.hotel(id),
            FOREIGN KEY (userID) REFERENCES ??.guest(id))`, [db,db], (err, results) => {
            if(err)
            {
                return reject(err);
            }
            console.log("Reservation table created!");
            return resolve(results);
        });
    });
};

//Hotel related methods
//Room related methods
//Reservation related methods

//User related methods
database.GetAllGuests = () =>
{
    return new Promise((resolve, reject) => {

        conn.query(`SELECT * FROM guest`, (err, results) => {
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        });

    });
};

database.GetGuest = ( id) =>
{
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM guest WHERE id = ?`, [ id],(err, results) => {
            if(err)
            {
                return reject(err);
            }
            //console.log(results[0].users)
            return resolve(results[0]);
        });

    });
};

database.CreateGuest = (req) =>
{
    return new Promise(async (resolve, reject) => {
        //Check if user already exists
        conn.query('SELECT COUNT(*) as users FROM guest WHERE guest.email = ?', [req.body.email], (err, results) => {
            if(err)
            {
                return reject(err);
            }
            if(results[0].users > 0)
            {
                return reject("Error: User already exists!");
            }
        });

        //Store user in database
        let hashed = await bcrypt.hash(req.body.password, 10);
        conn.query(`INSERT INTO guest(firstName, lastName, email, password ) VALUES(?, ?, ?, ?)`, [req.body.firstName, req.body.lastName, req.body.email, hashed], (err, results) => {
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        });
    });
};


module.exports = database;
