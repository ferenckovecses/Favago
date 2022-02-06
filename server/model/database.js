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
        });

        //Create room table
        conn.query(`CREATE TABLE IF NOT EXISTS room ( 
            id INT NOT NULL AUTO_INCREMENT ,  
            name VARCHAR(100) NOT NULL ,  
            price INT NOT NULL ,
            roomNumber INT NOT NULL,
            description TEXT,  
            hotelID INT NOT NULL ,    
            PRIMARY KEY  (id),
            FOREIGN KEY (hotelID) REFERENCES Favago.hotel(id))`, (err, results) => {
            if(err)
            {
                return reject(err);
            }
        });

        //Create reservation table
        conn.query(`CREATE TABLE IF NOT EXISTS reservation ( 
            id INT NOT NULL AUTO_INCREMENT ,  
            roomID INT NOT NULL ,  
            userID INT NOT NULL ,  
            startDate DATE NOT NULL ,
            endDate DATE NOT NULL ,
            cost INT NOT NULL,    
            PRIMARY KEY  (id),
            FOREIGN KEY (roomID) REFERENCES ??.room(id),
            FOREIGN KEY (userID) REFERENCES ??.guest(id))`, [db,db], (err, results) => {
            if(err)
            {
                return reject(err);
            }
            console.log("Tables has been created");
            return resolve(results);
        });
    });
};

//Guest related methods
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
            return resolve(results);
        });

    });
};

database.CreateGuest = (req) =>
{
    return new Promise( (resolve, reject) => {
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
            else
            {
                console.log("Insert user");
                bcrypt.hash(req.body.password, 10, (err,hash) => {
                    if(err)
                    {
                        return reject(err);
                    }
                    conn.query(`INSERT INTO guest(firstName, lastName, email, password ) VALUES(?, ?, ?, ?)`, [req.body.firstName, req.body.lastName, req.body.email, hash], (err, results) => {
                        if(err)
                        {
                            return reject(err);
                        }
                        return resolve(results);
                    });
                });
                
                
            }
        });
        
    });
};

//Hotel related methods
database.GetAllHotels = () =>
{
    return new Promise((resolve, reject) => {

        conn.query(`SELECT * FROM hotel`, (err, results) => {
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        });

    });
};

database.GetHotel = ( id) =>
{
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM hotel WHERE id = ?`, [ id],(err, results) => {
            if(err)
            {
                return reject(err);
            }
            //console.log(results[0].users)
            return resolve(results);
        });

    });
};

database.CreateHotel = (req) =>
{
    return new Promise(async (resolve, reject) => {
        //Check if hotel already exists
        conn.query('SELECT COUNT(*) as hotels FROM hotel WHERE hotel.name = ? AND hotel.city = ?', [req.body.name, req.body.city], (err, results) => {
            if(err)
            {
                return reject(err);
            }
            if(results[0].hotels > 0)
            {
                return reject("Error: Hotel already exists!");
            }
            else
            {
                //Store hotel in database
                conn.query(`INSERT INTO hotel(name, city ) VALUES(?, ?)`, [req.body.name, req.body.city], (err, results) => {
                    if(err)
                    {
                        return reject(err);
                    }
                    return resolve(results);
                });
            }
        });

        
        
        
    });
};
//Room related methods
database.GetAllRooms = () =>
{
    return new Promise((resolve, reject) => {

        conn.query(`SELECT * FROM room`, (err, results) => {
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        });

    });
};

database.GetRoom = ( id) =>
{
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM room WHERE id = ?`, [ id],(err, results) => {
            if(err)
            {
                return reject(err);
            }
            //console.log(results[0].users)
            return resolve(results);
        });

    });
};

database.CreateRoom = (req) =>
{
    return new Promise(async (resolve, reject) => {
        //Check if room already exists
        conn.query('SELECT COUNT(*) as rooms FROM room WHERE room.hotelID = ? AND room.roomNumber = ?', [ req.body.hotelID, req.body.roomNumber], (err, results) => {
            if(err)
            {
                return reject(err);
            }
            if(results[0].rooms > 0)
            {
                return reject("Error: Room already exists!");
            }
            else
            {
                //Store room in database
                conn.query(`INSERT INTO room(name, hotelID, roomNumber, price, description) VALUES(?, ?, ?, ?, ?)`, [req.body.name, req.body.hotelID, req.body.roomNumber, req.body.price, req.body.description], (err, results) => {
                    if(err)
                    {
                        return reject(err);
                    }
                    return resolve(results);
                });
            }
        });

        
        
        
    });
};
//Reservation related methods
database.GetAllReservations = () =>
{
    return new Promise((resolve, reject) => {

        conn.query(`SELECT * FROM reservation`, (err, results) => {
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        });

    });
};

database.GetReservationWithID = ( id) =>
{
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM reservation WHERE id = ?`, [ id],(err, results) => {
            if(err)
            {
                return reject(err);
            }
            //console.log(results[0].users)
            return resolve(results);
        });

    });
};

database.GetReservationWithGuest = (id) =>
{
    return new Promise((resolve, reject) => {
        conn.query(`SELECT hotel.name AS 'Hotel', room.name AS 'Room', 
                    reservation.startDate AS 'First day', reservation.endDate AS 'Last day', 
                    reservation.cost AS 'Cost'
                    FROM reservation
                    INNER JOIN room ON reservation.roomID = room.id
                    INNER JOIN hotel ON hotel.id = room.hotelID
                    WHERE reservation.userID = ?
                    ORDER BY reservation.endDate DESC`, [id],(err, results) => {
            if(err)
            {
                return reject(err);
            }
            //console.log(results[0].users)
            return resolve(results);
        });

    });
};

database.CreateReservation = (req) =>
{
    return new Promise(async (resolve, reject) => {

        var date1 = new Date(req.body.startDate);
        var date2 = new Date(req.body.endDate);
        var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24));

        if(diffDays < 0)
        {
            return reject("Invalid dates!");
        }

        conn.query(`SELECT Count(*) as conflicts FROM reservation WHERE roomID = ? AND reservation.startDate <= ? AND reservation.endDate >= ?`, [ req.body.roomID, req.body.endDate, req.body.startDate],(err, results) => {
            if(err)
            {
                return reject(err);
            }
            console.log("Conflicts: ", results[0].conflicts);
            if(results[0].conflicts > 0)
            {
                return reject("The room is taken in the given time period!");
            }
            else
            {
                conn.query(`SELECT price FROM room WHERE id = ?`, [ req.body.roomID],(err, results) => {
                    if(err)
                    {
                        return reject(err);
                    }
                    var cost = results[0].price * diffDays;
                    console.log("The cost of the room is: ", cost);

                    conn.query(`INSERT INTO reservation(roomID, userID, cost, startDate, endDate) VALUES (?,?,?,?,?)`, [ req.body.roomID,req.body.userID,cost,req.body.startDate,req.body.endDate],(err, results) => {
                        if(err)
                        {
                            return reject(err);
                        }
                        return resolve(results);
                    });
                });
            }
            
        }); 
        
    });
};

database.RemoveReservation = (id) => {
    return new Promise(async (resolve, reject) => {
        conn.query(`DELETE FROM reservation WHERE id = ?`, [id],(err, results) => {
            if(err)
            {
                return reject(err);
            }
            return resolve(results);
        });
    });
}


module.exports = database;
