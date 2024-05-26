const Movie = require('../models/movie');
const handleError = (res, error) => {
    res.status(500).json({error});
}

const getMovies = (req, res) => {
    Movie
        .find()
        .sort({title: 1})
        .then((movies) => {
            res.status(200).json(movies);
        })
        .catch((err) => handleError(res, err));
}

const getMovieById = (req, res) => {
    Movie
        .findById(req.params.id)
        .then((movie) => {
            res.status(200).json(movie);
        })
        .catch((err) => handleError(res, err));
}

const deleteMovie = (req, res) => {
    Movie
        .findByIdAndDelete(req.params.id)
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => handleError(res, err));
}

const addMovie = (req, res) => {
    const movie = new Movie(req.body);

    movie
        .save()
        .then((doc) => {
            res.status(201).json(doc);
        })
        .catch((err) => handleError(res, err));
}

const updateMovie = (req, res) => {
    Movie
        .findByIdAndUpdate(req.params.id, req.body, { new: true })  // Опция new: true для возврата обновленного документа
        .then((doc) => {
            res.status(200).json(doc);
        })
        .catch((err) => handleError(res, err));
}

module.exports = {
    getMovies,
    getMovieById,
    deleteMovie,
    addMovie,
    updateMovie
};