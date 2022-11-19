const pool = require("../database/db");

module.exports.Report = {

    GetReport1:async function (req,res){

        let response = {
          error: false,
          data: null,
        };
      
      await pool.query("SELECT COUNT(*) victoriasCroupier, "+
                       " (SELECT COUNT(*)FROM games) totalJuegos "+
                       "FROM games AS g WHERE g.idResultType=3" )
      .then( resp=>{

          response.data=resp;
          res.status(200).json(response);
        
       })
       .catch(error=> {
        console.log(error);
        response.error = true;
        res.status(500).json(response);
       });
      },

    GetReport2:async function (req,res){

        let response = {
          error: false,
          data: null,
        };
      
  
      await pool.query("SELECT g.date, COUNT(*) AS cantidadJuegos, COUNT(DISTINCT g.idPlayer) AS cantidadJugadores"
                        +" FROM games AS g GROUP BY g.date" )
      .then( resp=>{

          response.data=resp;
          res.status(200).json(response);
        
       })
       .catch(error=> {
        console.log(error);
        response.error = true;
        res.status(500).json(response);
       });
      },
     
      GetReport3:async function (req,res){

        let response = {
            error: false,
            data: null,
          };
        
    
        await pool.query("SELECT COUNT(*) victoriasCroupier, "+
                         " (SELECT COUNT(*)FROM games) totalJuegos "+
                          "FROM games AS g WHERE g.idResultType=3")
       .then( resp=>{
  
            response.data=resp;
            res.status(200).json(response);
          
         })
         .catch(error=> {
          console.log(error);
          response.error = true;
          res.status(500).json(response);
         });
      }

};