const express= require('express')
const cors = require('cors');
const app = express();
const config = require('./config/config');

const PORT = config.database.port || 3000

//Middlewares Config

app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middlewares Routes

app.use('/api/cards', require('./routes/cardsRoutes'));
app.use('/api/games', require('./routes/gamesRoutes'));
app.use('/api/', require('./routes/detailsGamesRoutes'));
app.use('/api/players', require('./routes/playersRoutes'));

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`)
});

module.exports = app;