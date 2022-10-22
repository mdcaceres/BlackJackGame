const express = require('express');
const router = express.Router();
const {Game} = require ('../controllers/gameController');



 router.get('/', async function (req,res) 
 {
   //await Game .....(req,res);

 });

 router.get('/:id', async function (req,res) 
 {
   //await Game..... (req,res);

 });


module.exports= router;