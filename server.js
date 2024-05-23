const express = require('express');
const { getDb, connectToDb} = require('./db')

const PORT = 3000;

const app = express();

let db;

connectToDb((err) => {
   if(!err) {
       app.listen(PORT, (err) => {
           err ? console.log(err) : console.log(`Listening port ${PORT}`);
       });
       db = getDb();
   } else {
       console.log(`DB connection error: ${err}`)
   }
});