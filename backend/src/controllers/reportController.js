const pool = require("../database/db");

module.exports.Report = {

    GetReport1:async function (req,res){

        let response = {
          error: false,
          data: null,
        };
      
      await pool.query("SELECT count(*) as victoriasCroupier,"+
                       "  (SELECT count(*) FROM games WHERE idResultType not in(1 ,4)) as totalJuegos "+ 
                      "FROM games AS g  group by g.idResultType having g.idResultType=3"
                      )
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
        
    
        await pool.query("select (select count(*) from games where idResultType=2 && isBlackJack=1 ) as BjPlayer, "+
                         "(select count(*) from games where idResultType=2) as VictoriasPlayer, "+
                         "(select count(*) from games where idResultType=3 && isBlackJack=1) as BjCroupier, "+
                         "(select count(*) from games where idResultType=3) as VictoriasCroupier "+
                         " from games g where idResultType=2 or idResultType=3 "+
                         "group by BjPlayer, VictoriasPlayer, BjCroupier, VictoriasCroupier ")
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