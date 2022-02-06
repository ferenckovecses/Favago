const express = require('express');
const db = require('../db/database');
const controller = require('../controller')

const router = express.Router();

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
    
    res.sendStatus(200);
});

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

module.exports = router;