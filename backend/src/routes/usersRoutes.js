const express = require('express');
const router = express.Router();
const {User} = require ('../controllers/usersControllers');

 router.get('/', async function (req,res) 
 {
   await User.GetDeck(req,res);

 });


module.exports= router;