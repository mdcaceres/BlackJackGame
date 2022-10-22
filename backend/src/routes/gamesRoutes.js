const express = require('express');
const router = express.Router();
const {Game} = require ('../controllers/gamesController');



 router.get('/', async function (req,res) 
 {
   await Game.GetAllGames(req,res);

 });

 router.get('/:id', async function (req,res) 
 {
   await Game.GetGame(req,res);

 });

 router.post("/", async (req, res) => {

  await Game.CreateGame(req, res);

});

router.delete("/:id", async (req, res) => {

  await Game.DeleteGame(req, res);

});

//TODO:ver Logica de actualización de juego... update
router.put("/:id", async (req, res) => {

  await Game.updateResultGame(req, res);

});

module.exports= router;