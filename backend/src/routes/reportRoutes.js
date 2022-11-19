const express = require('express');
const router = express.Router();
const {Report} = require ('../controllers/reportController');



 router.get('/1', async function (req,res) 
 {
   await Report.GetReport1(req,res);

 });

 router.get('/2', async function (req,res) 
 {
   await Report.GetReport2(req,res);

 });

 router.get('/3', async function (req,res) 
 {
   await Report.GetReport3(req,res);

 });


module.exports= router;