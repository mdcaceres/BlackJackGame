const pool = require("../database/db");

module.exports.Cards = {
 
    GetAllCards:async function(req,res) {

      let response = {
        error: false,
        data: null,
      };
        await pool.query("SELECT c.id, c.value,s.description AS suite FROM "+
                         "cards c JOIN suiteTypes s ON c.idSuiteType =s.id")
             .then(cards=>{
              response.data= cards
              res.status(200).json(response);
             })
             .catch(error=> {
               console.log(error)

               response.error= true;
               response.data= error;
               res.status(500).json(response)
             });


    },
    
    GetCard:async function (req,res){

      let response = {
        error: false,
        data: null,
      };
    
    const { id } = req.params;

    await pool.query("SELECT c.id, c.value,s.description AS suite FROM "+
                     "cards c JOIN suiteTypes s ON c.idSuiteType=s.id "+
                     "WHERE c.id= ?" , id)
    .then(card =>{

      if (card.length === 0){
        response.error=true;
        response.data= { msg: "Card not found" }
        return res.status(404).json(response)
      } 
      else{
        response.data={ card: card[0]}
        res.status(200).json(response);
      }
     })
     .catch(error=> {
      console.log(error);
      response.error = true;

      res.status(500).json(response);
     });
    }

  
};
