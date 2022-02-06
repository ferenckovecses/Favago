const request = require('request');

let controller = {};
const apiPath = 'http://localhost:3000/api/';
const guestPath = 'guest';
const reservationPath = 'reservation';
const hotelPath = 'hotel';
const roomPath = 'room';

controller.AddGuest = () => {
    return new Promise((resolve, reject) => {
        request.post(
            apiPath+guestPath,
            {
            json: {
                firstName: 'Jack',
                lastName: 'Lumber',
                email: 'lumberJaxx@gmail.com',
                password: 'passwordBackwardsIsdrowssap',
            },
            },
            (err, res, body) => {
            if (err) {
                return reject(err)
            }
            return resolve(res)
            }
        )
    });
}

module.exports = controller;