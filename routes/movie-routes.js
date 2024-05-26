const express = require('express');
const {
    getMovies,
    getMovieById,
    deleteMovie,
    addMovie,
    updateMovie
} = require('../controllers/movie-controller');

const router = express.Router();

router.get('/movies', getMovies);
router.get('/movies/:id', getMovieById);
router.delete('/movies/:id', deleteMovie);
router.post('/movies', addMovie);
router.patch('/movies/:id', updateMovie);

module.exports = router;
