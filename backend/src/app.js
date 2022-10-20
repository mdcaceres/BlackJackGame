const express= require('express')
const app = express();
const config = require('./config/config');

const PORT = config.database.port || 3000

//Middlewares Config
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middlewares Routes
app.use('/api/users', require('./routes/usersRoutes'));

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`)
});

module.exports = app;