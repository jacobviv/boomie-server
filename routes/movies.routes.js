const router = require("express").Router()

const Movie = require('../models/Movie.model')

router.get("/getAllMovies", (req, res, next) => {

  Movie
    .find()
    .sort({ name: 1 })
    .select({ name: 1, movieRating: 1, owner: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/details/:Movie_id", (req, res, next) => {

  const { Movie_id } = req.params

  Movie
    .findById(Movie_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/saveMovie", (req, res, next) => {

  const {
    movieID,
    movieTitle,
    movieDirector,
    movieRating,
    moviePoster,
    movieLanguage,
    movieOverview,
    movieReleaseDate
  } = req.body

  Movie
    .create({
      movieID,
      movieTitle,
      movieDirector,
      movieRating,
      moviePoster,
      movieLanguage,
      movieOverview,
      movieReleaseDate
    })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put('/edit/:Movie_id', (req, res, next) => {

  const { movieTitle, movieDirector, movieLanguage, movieOverview } = req.body
  const { Movie_id } = req.params

  Movie
    .findByIdAndUpdate(Movie_id, { movieTitle, movieDirector, movieLanguage, movieOverview })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.delete('/delete/:Movie_id', (req, res, next) => {

  const { Movie_id } = req.params

  Movie
    .findByIdAndDelete(Movie_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


module.exports = router
