const express = require('express');
const db = require('../model/database');
const controller = require('../model/data_insertion');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Guest:
 *       type: object
 *       required:
 *         - firtsName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the guest
 *         firtsName:
 *           type: string
 *           description: The first name of the guest
 *         lastName:
 *           type: string
 *           description: The last name of the guest
 *         email:
 *           type: string
 *           description: The e-mail address of the guest
 *         password:
 *           type: string
 *           description: The password of the guest
 *       example:
 *         firstName: Peter
 *         lastName: File
 *         email: peterfile@gmail.com
 *         password: password
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       required:
 *         - name
 *         - city
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the hotel
 *         name:
 *           type: string
 *           description: The hotel's name
 *         city:
 *           type: string
 *           description: The hotel's address
 *       example:
 *         name: Hotel Maple
 *         city: Vancouver
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Room:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - roomNumber
 *         - hotelID
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the room
 *         name:
 *           type: string
 *           description: The room's name
 *         price:
 *           type: integer
 *           description: The room's daily price
 *         roomNumber:
 *           type: integer
 *           description: The room's number
 *         hotelID:
 *           type: integer
 *           description: The hotel's ID
 *       example:
 *         name: Single bed room
 *         price: 5000
 *         roomNumber: 33
 *         hotelID: 2
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Reservation:
 *       type: object
 *       required:
 *         - roomID
 *         - userID
 *         - startDate
 *         - endDate
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the reservation
 *         roomID:
 *           type: integer
 *           description: The ID of the room
 *         userID:
 *           type: integer
 *           description: The ID of the user
 *         startDate:
 *           type: date
 *           description: The date of the first day of the reservation
 *         endDate:
 *           type: date
 *           description: The date of the last day of the reservation
 *       example:
 *         roomID: 1
 *         userID: 1
 *         startDate: 2022-05-09
 *         endDate: 2022-05-11
 */

 /**
  * @swagger
  * tags:
  *   name: Test
  *   description: These API commands are made for testing setting up the enviroment for testing.
  */

 /**
 * @swagger
 * /api/init:
 *   get:
 *     summary: Creates the database, the tables and then populates them with dummy data.
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: The process was successful, the database is ready for testing.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Guest'
 *         500:
 *          description: Some server error
 */
router.get('/init/', async (req,res, next) => {

    //Create the database
    try{
        let results = await db.Init();
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    //Populate the database with dummy data
    try{
        await controller.AddGuest()
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    try{
        await controller.AddSecondGuest()
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    try{
        await controller.AddHotel()
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    try{
        await controller.AddSecondHotel()
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    try{
        await controller.AddRoom()
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    try{
        await controller.AddSecondRoom()
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    try{
        await controller.AddThirdRoom()
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
        return;
    }

    try{
        await controller.AddReservation()
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
        return;
    }
    
    res.sendStatus(200);
});

 /**
  * @swagger
  * tags:
  *   name: Guest
  *   description: Manage the list of guests with these API commands
  */

/**
 * @swagger
 * /api/guest:
 *   get:
 *     summary: Returns the list of users.
 *     tags: [Guest]
 *     responses:
 *       200:
 *         description: The list of every user in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Guest'
 *         500:
 *          description: Some server error
 */
router.get('/guest/', async (req,res, next) => {

    try{
        let results = await db.GetAllGuests();
        res.json(results);
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * @swagger
 * /api/guest/{id}:
 *   get:
 *     summary: Returns a specific user by it's ID.
 *     tags: [Guest]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The user's ID
 *     responses:
 *       200:
 *         description: The data of the user with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Guest'
 *         500:
 *          description: Some server error
 */
router.get('/guest/:id', async (req,res, next) => {

    try{
        let results = await db.GetGuest(req.params.id);
        res.json(results);
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * @swagger
 * /api/guest:
 *   post:
 *     summary: Create a new guest, if the given e-mail address is not taken already.
 *     tags: [Guest]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Guest'
 *     responses:
 *       200:
 *         description: The guest was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guest'
 *       500:
 *         description: Some server error
 */

router.post("/guest/", async (req, res, next) => {
	try {
        let results = await db.CreateGuest(req);
        res.json(results);
	} catch (error) {
        console.log(error);
		return res.status(500).send(error);
	}
});

 /**
  * @swagger
  * tags:
  *   name: Hotel
  *   description: Manage the list of hotels with these API commands
  */

 /**
 * @swagger
 * /api/hotel:
 *   get:
 *     summary: Returns the list of hotels.
 *     tags: [Hotel]
 *     responses:
 *       200:
 *         description: The list of every hotel in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 *         500:
 *          description: Some server error
 */
router.get('/hotel/', async (req,res, next) => {

    try{
        let results = await db.GetAllHotels();
        res.json(results);
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * @swagger
 * /api/hotel/{id}:
 *   get:
 *     summary: Returns a specific hotel by it's ID.
 *     tags: [Hotel]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The hotel's ID
 *     responses:
 *       200:
 *         description: The data of the hotel with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hotel'
 *         500:
 *          description: Some server error
 */
router.get('/hotel/:id', async (req,res, next) => {

    try{
        let results = await db.GetHotel(req.params.id);
        res.json(results);
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * @swagger
 * /api/hotel:
 *   post:
 *     summary: Creates a new hotel
 *     tags: [Hotel]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Hotel'
 *     responses:
 *       200:
 *         description: The hotel was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hotel'
 *       500:
 *         description: Some server error
 */
router.post("/hotel/", async (req, res, next) => {
	try {
        let results = await db.CreateHotel(req);
        res.json(results);
	} catch (error) {
        console.log(error);
		return res.status(500).send(error);
	}
});

 /**
  * @swagger
  * tags:
  *   name: Room
  *   description: Manage the list of rooms with these API commands
  */

 /**
 * @swagger
 * /api/room:
 *   get:
 *     summary: Returns the list of rooms.
 *     tags: [Room]
 *     responses:
 *       200:
 *         description: The list of every room in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *         500:
 *          description: Some server error
 */
router.get('/room/', async (req,res, next) => {

    try{
        let results = await db.GetAllRooms();
        res.json(results);
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * @swagger
 * /api/room/{id}:
 *   get:
 *     summary: Returns a specific room by it's ID.
 *     tags: [Room]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The room's ID
 *     responses:
 *       200:
 *         description: The data of the room with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 *         500:
 *          description: Some server error
 */
router.get('/room/:id', async (req,res, next) => {

    try{
        let results = await db.GetRoom(req.params.id);
        res.json(results);
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * @swagger
 * /api/room:
 *   post:
 *     summary: Creates a new room
 *     tags: [Room]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       200:
 *         description: The room was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       500:
 *         description: Some server error
 */
router.post("/room/", async (req, res, next) => {
	try {
        let results = await db.CreateRoom(req);
        res.json(results);
	} catch (error) {
        console.log(error);
		return res.status(500).send(error);
	}
});

 /**
 * @swagger
 * /api/reservation:
 *   get:
 *     summary: Returns the list of reservations.
 *     tags: [Reservation]
 *     responses:
 *       200:
 *         description: The list of every reservation in the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *         500:
 *          description: Some server error
 */
router.get('/reservation/', async (req,res, next) => {

    try{
        let results = await db.GetAllReservations();
        res.json(results);
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * @swagger
 * /api/reservation/{id}:
 *   get:
 *     summary: Returns a specific reservation by it's ID.
 *     tags: [Reservation]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: The room's ID
 *     responses:
 *       200:
 *         description: The data of the reservation with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *         500:
 *          description: Some server error
 */
router.get('/reservation/:id', async (req,res, next) => {

    try{
        let results = await db.GetReservationWithID(req.params.id);
        res.json(results);
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * @swagger
 * /api/reservation:
 *   post:
 *     summary: Creates a new reservation
 *     tags: [Reservation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       200:
 *         description: The reservation was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Some server error
 */
router.get('/reservation/guest/:id', async (req,res, next) => {

    try{
        let results = await db.GetReservationWithGuest(req.params.id);
        res.json(results);
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * @swagger
 * /api/reservation/guest/{id}:
 *   delete:
 *     summary: Remove the reservation by id
 *     tags: [Reservation]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The reservation id
 * 
 *     responses:
 *       200:
 *         description: The reservation was deleted
 *       500:
 *         description: Internal server error
 */
router.delete('/reservation/guest/:id', async (req,res, next) => {

    try{
        let results = await db.RemoveReservation(req.params.id);
        res.json(results);
    } catch(e)
    {
        console.log(e);
        res.sendStatus(500);
    }

});

router.post("/reservation/", async (req, res, next) => {
	try {
        let results = await db.CreateReservation(req);
        res.json(results);
	} catch (error) {
        console.log(error);
		return res.status(500).send(error);
	}
});

module.exports = router;