const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./models/movie');
const PORT = 3000;
const URL = 'mongodb://localhost:27017/movieBox';

const app = express();
app.use(express.json());

mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`listening port ${PORT}`);
});

const handleError = (res, error) => {
    res.status(500).json({error});
}

app.get('/movies', (req, res) => {
    Movie
        .find()
        .sort({title: 1})
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch(() => handleError(res, "Something goes wrong"));
});

app.get('/movies/:id', (req, res) => {
    Movie
        .findById(req.params.id)
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.delete('/movies/:id', (req, res) => {
    Movie
        .findByIdAndDelete(req.params.id)
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.post('/movies', (req, res) => {
    const movie = new Movie(req.body);

    movie
        .save()
        .then((doc) => {
            res.status(201).json(doc);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.patch('/movies/:id', (req, res) => {
        Movie
            .findByIdAndUpdate(req.params.id, req.body)  // Используем оператор new
            .then((doc) => {
                res.status(200).json(doc);
            })
            .catch(() => handleError(res, "Something goes wrong..."));
});