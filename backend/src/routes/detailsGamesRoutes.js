const express = require('express');
const router = express.Router();
const {Details} = require ('../controllers/detailsGamesController');



 router.get('/', async function (req,res) 
 {
   //in progress await Game .....(req,res);

 });

 router.get('/:id', async function (req,res) 
 {
   // in progress await Game..... (req,res);

 });

 router.post("/games/:idGame/details", async (req, res) => {
    await Details.createDetailGame(req, res);
  });





module.exports= router;