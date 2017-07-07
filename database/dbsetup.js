// connection
require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_URL,
  dialect: 'mysql',
  port: process.env.DB_PORT,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
    
// // Or you can simply use a connection uri
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

db
  .authenticate()
  .then(() => {
    console.log('DB Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to cosnnect to the database:', err);
  });

module.exports = db; 
