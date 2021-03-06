/**
 * The module's purpose is to populate the created database in the init phase with some dummy data.
 * It's just a tool for making the test phase faster.
 */

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
                firstName: 'Rose',
                lastName: 'Axe',
                email: 'axxr@gmail.com',
                password: 'sajt',
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

controller.AddSecondGuest = () => {
    return new Promise((resolve, reject) => {
        request.post(
            apiPath+guestPath,
            {
            json: {
                firstName: 'Jack',
                lastName: 'Lumber',
                email: 'lumberJaxxd@gmail.com',
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

controller.AddHotel = () => {
    return new Promise((resolve, reject) => {
        request.post(
            apiPath+hotelPath,
            {
            json: {
                name: 'Oak Hill Hotel',
                city: 'Budapest'
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

controller.AddSecondHotel = () => {
    return new Promise((resolve, reject) => {
        request.post(
            apiPath+hotelPath,
            {
            json: {
                name: 'Pinecone Paradise',
                city: 'Montreal'
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

controller.AddRoom = () => {
    return new Promise((resolve, reject) => {
        request.post(
            apiPath+roomPath,
            {
            json: {
                name: 'K??kfeny?? lakoszt??ly',
                hotelID: '1',
                roomNumber: '111',
                price: '254000',
                description: 'Ez a meghitt, nyugodt ??sszhat??st ny??jt?? lakoszt??ly b??rmely kikapcsol??d??st keres?? p??r sz??m??ra t??k??letes mened??ket biztos??t.'
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

controller.AddSecondRoom = () => {
    return new Promise((resolve, reject) => {
        request.post(
            apiPath+roomPath,
            {
            json: {
                name: 'Fasz??ll??t?? n??szutas lakoszt??ly',
                hotelID: '1',
                roomNumber: '69',
                price: '400000',
                description: 'Friss h??zasok sz??m??ra biztos??tja a t??k??letes meghitts??get ??s intimit??st. A sz??viccek??rt extra k??lts??geket sz??molunk fel.'
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

controller.AddThirdRoom = () => {
    return new Promise((resolve, reject) => {
        request.post(
            apiPath+roomPath,
            {
            json: {
                name: 'The \'Ryan Reynolds slept here once\' room',
                hotelID: '2',
                roomNumber: '88',
                price: '20000000',
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

controller.AddReservation = () => {
    return new Promise((resolve, reject) => {
        request.post(
            apiPath+reservationPath,
            {
            json: {
                roomID: '2',
                userID: '2',
                startDate: '2022-03-09',
                endDate: '2022-04-14',
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