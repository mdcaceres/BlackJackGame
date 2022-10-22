const express = require('express');
const router = express.Router();
const {Player} = require ('../controllers/playersController');



 router.get('/', async function (req,res) 
 {
   await Player.GetAllPlayers(req,res);

 });

 router.get('/:id', async function (req,res) 
 {
   await Player.GetPlayer(req,res);

 });

 router.post('/', async function (req,res) 
 {
   await Player.RegisterPlayer(req,res);

 });

 router.post('/login', async function (req,res) 
 {
   await Player.LoginPlayer(req,res);

 });




module.exports= router;