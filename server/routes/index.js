const express = require('express');
const db = require('../model/database');
const controller = require('../model/data_insertion');
const { json } = require('express/lib/response');

const router = express.Router();


//Database init page
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

//Guest pages
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

router.post("/guest/", async (req, res, next) => {
	try {
        let results = await db.CreateGuest(req);
        res.json(results);
	} catch (error) {
        console.log(error);
		return res.status(500).send(error);
	}
});

//Hotel pages
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

router.post("/hotel/", async (req, res, next) => {
	try {
        let results = await db.CreateHotel(req);
        res.json(results);
	} catch (error) {
        console.log(error);
		return res.status(500).send(error);
	}
});

//Room pages
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

router.post("/room/", async (req, res, next) => {
	try {
        let results = await db.CreateRoom(req);
        res.json(results);
	} catch (error) {
        console.log(error);
		return res.status(500).send(error);
	}
});

//Reservation pages
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