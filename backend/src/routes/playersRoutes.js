const express = require('express');
const router = express.Router();
const {Player} = require ('../controllers/playersController');



 router.get('/all', async function (req,res) 
 {
   await Player.GetAllPlayers(req,res);

 });

 router.get('/:id', async function (req,res) 
 {
   await Player.GetPlayer(req,res);

 });

 router.post('/register', async function (req,res) 
 {
   await Player.RegisterPlayer(req,res);

 });

 router.post('/login', async function (req,res) 
 {
   await Player.LoginPlayer(req,res);

 });




module.exports= router;