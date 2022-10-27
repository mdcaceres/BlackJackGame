const pool = require("../database/db");

module.exports.Game = {

 CreateGame: async function (req, res) {
    
    let response = {
      error: false,
      data: null,
    };

    const{ idResultType, idPlayer}= req.body;
      
    const newGame={  
        idResultType:idResultType, //1-pending 2-win 3-lost 4-draw
        idPlayer: idPlayer,   // //validar si el player tiene partida en curso??
    }

    const playerExists= await pool.query('SELECT * FROM players where id= ?', idPlayer)
    
    if(playerExists.length ==0){ 
        response.error=true;
        response.data= { msg: "Player not valid" }
        return res.status(400).json(response)
    }  

    await pool.query('INSERT INTO games SET ?', newGame)
        .then(result=>{

          response.data={ idGame: result.insertId,
                          msg:" Successful  created "}
          res.status(200).json(response)
        })
       .catch((error) => {
        response.error = true;
        response.data = error;

        res.status(500).json(response);
      });


  },

  GetAllGames: async function (req, res) {

    let response = {
      error: false,
      data: null,
    };

      await pool.query('SELECT g.id as gameID, p.name as playerName, p.id as idPlayer, r.description as result FROM games g JOIN resultTypes r on r.id=g.idResultType JOIN players p on p.id= g.idPlayer')
           .then(games =>{
            response.data= games
            res.status(200).json(response);
           })
           .catch(error=> {
             console.log(error)

             response.error= true;
             response.data= error;
             res.status(500).json(response)
           });

  },

  GetGame: async function (req, res) {
    
    let response = {
      error: false,
      data: null,
    };
  
  const { id } = req.params;

  /* TODO: Candidato a consultar por SP
    SELECT g.idPlayer as playerID, d.id as detailID, idResultType as result, s.description as suite, c.value , d.isCroupier 
FROM games g 
JOIN gamesDetails d on g.id=d.idGame
// => JOIN resultTypes r on r.id=g.idResultType validar que no sea nulo 
JOIN cards c on c.id= d.idCard
JOIN suiteTypes s on s.id= c.idSuiteType
WHERE g.id = '1'
   */

  await pool.query("SELECT * FROM games g JOIN gamesDetails d ON g.id=d.idGame "+
                   "WHERE g.id = ?", id) //Acá joineamos la consulta de acuerdo a lo que necesitemos.
  .then(game =>{

    if (game.length === 0){
      response.error=true;
      response.data= { msg: "Game not found" }
      return res.status(404).json(response)
    } 
    else{
      response.data={ gameDetails: game}
      res.status(200).json(response);
    }
   })
   .catch(error=> {
    console.log(error);
    response.error = true;

    res.status(500).json(response);
   });
  
  },

  updateResultGame: async function (req, res) {

    let response = {
      error: false,
      data: null,
    };

    const { id } = req.params;
    const {result}=req.body;

    const gameExists = await pool.query("SELECT * FROM games WHERE id= ?", id)

    if (gameExists.length == 0){
        response.error=true;
        response.data= { msg: "Game not found" }
        return res.status(404).json(response)
    }
     await pool.query("UPDATE games SET idResultType = ? WHERE id = ?",[result, id] )
      .then( result =>{
        response.data= {msg:`Game: ${id} was updated`}
        res.status(200).json(response);
      
      })
      .catch((error) => {
        console.log(error);
        response.error = true;
        res.status(500).json(response);
       });
  },



  DeleteGame: async function (req, res) {

    let response = {
      error: false,
      data: null,
    };

    const { id } = req.params;

    const gameExists = await pool.query("SELECT * FROM games g LEFT JOIN "+
                                        "gamesDetails d ON g.id=d.idGame"+
                                        " WHERE g.id= ?", id)
    if (gameExists.length == 0){
        response.error=true;
        response.data= { msg: "Game not found" }
        return res.status(404).json(response)
    }
    
     const deleteDetails= await pool.query("DELETE FROM gamesDetails WHERE idGame= ?", id )
     console.log('deleteRowsdetail: ',deleteDetails.affectedRows)

     await pool.query("DELETE FROM games WHERE id= ?", id )
      .then( result =>{

        console.log('deletedGame: ', result.affectedRows)
        response.data= {msg:`Game: ${id} was deleted whit details`}
        res.status(200).json(response);
      
      })
      .catch((error) => {
        console.log(error);
        response.error = true;
        res.status(500).json(response);
       });
  },



  
};
