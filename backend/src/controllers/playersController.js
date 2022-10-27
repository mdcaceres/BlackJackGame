const bcrypt = require("bcrypt");
const authconfig = require("../config/auth");
const jwt = require("jsonwebtoken");
const pool = require("../database/db");

module.exports.Player = {
 
    GetAllPlayers:async function(req,res) {

      let response = {
        error: false,
        data: null,
      };
        await pool.query('SELECT id, name, email FROM players')
             .then(players =>{
              response.data= players
              res.status(200).json(response);
             })
             .catch(error=> {
               console.log(error)

               response.error= true;
               response.data= error;
               res.status(500).json(response)
             });


    },
    
    GetPlayer:async function (req,res){

      let response = {
        error: false,
        data: null,
      };
    
    const { id } = req.params;

    await pool.query("SELECT id, name, email FROM players WHERE id = ?", id)
    .then(player =>{

      if (player.length === 0){
        response.error=true;
        response.data= { msg: "Player not found" }
        return res.status(404).json(response)
      } 
      else{
        response.data={ player: player[0]}
        res.status(200).json(response);
      }
     })
     .catch(error=> {
      console.log(error);
      response.error = true;

      res.status(500).json(response);
     });
    },

  RegisterPlayer: async function (req, res) {
    let response = {
      error: false,
      data: null,
    };

    const { name, email, password } = req.body;
    /*
    TODO: validation errors

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }) 
    }*/

    const emailExists= await pool.query('SELECT * FROM players where email = ?', email)
    
    if(emailExists.length != 0){ 
        response.error=true;
        response.data= { msg: "The account already exists" }
        return res.status(400).json(response)
    }  

    const newPassword = bcrypt.hashSync(
      password,
      Number.parseInt(authconfig.rounds)
    );

    const newUser = {
      name: name,
      email: email,
      password: newPassword,
    };

    await pool.query("INSERT INTO players SET ? ", newUser)
      .then((result) => {
        const token = jwt.sign({ email: email, name: name }, authconfig.secret, {
          expiresIn: authconfig.expires,
        });
        response.data = token;

        res.status(200).json(response);
      })
      .catch((error) => {
        console.log(error);
        response.error = true;

        res.status(500).json(response);
      });
  },

  LoginPlayer: async function (req, res) {

    let response = {
      error: false,
      data: null,
    };

    const { email, password } = req.body;

    await pool.query("SELECT * FROM players WHERE email = ?", email)
      .then((result) => {

        if (result.length === 0) {

          response.error = true;
          response.data = { msg: "check credential" }; //email error
          res.status(401).json(response);

        } else {

            let row = null;
            Object.keys(result).forEach((key) => {
            row = result[key];
          });

          if (bcrypt.compareSync(password, row.password)) {
            //if password ok return token
            const token = jwt.sign(
              { email: row.email, name: row.name },
              authconfig.secret,
              {
                expiresIn: authconfig.expires,
              }
            );

            response.data = { user: row.email, id: row.id, token: token };

            res.status(200).json(response);
          } else {
            response.error = true;
            response.data = { msg: "check credential" }; 
            res.status(401).json(response);
          }
        }
      })
      .catch((error) => {
        response.error = true;
        response.data = error;

        res.status(500).json(response);
      });
  },

  
};
