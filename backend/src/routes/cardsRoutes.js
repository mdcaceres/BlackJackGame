const express = require('express');
const router = express.Router();
const {Cards} = require ('../controllers/cardsController');



 router.get('/', async function (req,res) 
 {
   await Cards.GetAllCards(req,res);

 });

 router.get('/:id', async function (req,res) 
 {
   await Cards.GetCard(req,res);

 });


module.exports= router;