require('dotenv').config()

const router = require("express").Router()
const Movie = require('../models/Movie.model')
const axios = require('axios')

const apiTMDB = axios.create({
  baseURL: 'https://api.themoviedb.org/3/'
})

router.get("/api/search/:movieTitle", (req, res, next) => {

  const { movieTitle } = req.params

  apiTMDB.get(`search/movie?api_key=${process.env.TMDB_API_KEY}&query=${movieTitle}`)
    .then(({ data }) => {
      res.send(data)
    })
    .catch(err => next(err))
})

router.get("/api/load/:movieKey", (req, res, next) => {

  const { movieKey } = req.params

  apiTMDB.get(`movie/${movieKey}/credits?api_key=${process.env.TMDB_API_KEY}`)
    .then(({ data }) => {
      res.send(data)
    })
    .catch(err => next(err))
})

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

router.get("/detailsByKey/:Movie_key", (req, res, next) => {

  const { Movie_key } = req.params

  Movie
    .findOne({ movieID: Movie_key })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.post("/saveMovie", (req, res, next) => {

  const {
    id,
    title,
    director,
    vote_average,
    overview,
    release_date
  } = req.body

  Movie
    .create({
      movieID: id,
      movieTitle: title,
      movieDirector: director,
      movieRating: vote_average,
      moviePoster: 'dummy',
      movieLanguage: 'dummy',
      movieOverview: overview,
      movieReleaseDate: release_date,
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
