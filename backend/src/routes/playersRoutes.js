const express = require('express');
const router = express.Router();
const {Player} = require ('../controllers/playersControllers');

 router.get('/', async function (req,res) 
 {
   await Player.GetDeck(req,res);

 });


module.exports= router;