const dotenv = require('dotenv');

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`

});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  database: {
      connectionLimit: 10,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password:  process.env.DB_PASSWORD,
      port: process.env.PORT || 3000
      
  }

};