const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movie');
const movieRoutes = require('./routes/movie-routes');

const PORT = 3000;
const URL = "mongodb+srv://VladimirFilimonov:Pass123@cluster0.uq68dmo.mongodb.net/moviebox?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
app.use(express.json());
app.use(movieRoutes);

mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`listening port ${PORT}`);
});