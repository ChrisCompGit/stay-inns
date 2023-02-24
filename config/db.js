const { Client } = require('pg');
require('dotenv').config()

const db = new Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  database: 'stay_inns',
  password: process.env.DB_PASS

})

db.connect()
.then(()=>console.log("Connected to db"))
.catch(err=>console.log("Error", err))

module.exports = db;