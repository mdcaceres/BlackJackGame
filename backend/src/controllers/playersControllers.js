const bcrypt= require('bcrypt');
const authconfig=require('../config/auth');
const jwt= require('jsonwebtoken');
const pool= require('../database/db');

module.exports.Player = {
    GetDeck: async function(req,res)
    {
      const result= await pool.query('select * from card');
      console.log(result);
      res.status(200).json(result)
      
    },

};