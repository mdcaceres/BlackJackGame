const pool = require("../database/db");

module.exports.Details = {

 createDetailGame: async function (req, res) {

       let response = {
        error: false,
        data: null 
       };

        const{idGame}= req.params;
        const{idCard, isCroupier}= req.body;

        const gameExists= await pool.query("SELECT * FROM games WHERE id =?", idGame)
        if (!gameExists) {
            response.error=true;
            response.data= { msg: "IdGame not valid" }
            return res.status(400).json(response)
        }
        //TODO: al traer el gameExists puedo obtener todos sus detalles por id del juego, agregar alguna validación... calculo..
        //se podría updatear el resultado del game... 

        const newDetailGame={
            idCard:idCard, //Valido que la carta no exista en el mazo en ningun detalle del gameid...?
            idGame:idGame,
            isCroupier:isCroupier
        }
      
        await pool.query("INSERT INTO gamesDetails SET ? ", newDetailGame)
        .then(result=>{
          response.data={ idDetail: result.insertId,
                          msg:" Detail successful created "}
          res.status(200).json(response)
        })
       .catch((error) => {
        response.error = true;
        response.data = error;

        res.status(500).json(response);
      });
    }



    
};
