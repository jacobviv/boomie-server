const router = require("express").Router()

const Battle = require('./../models/Battle.model')

router.get("/getAllBattles", (req, res, next) => {

  Battle
    .find()
    .sort({ name: 1 })
    .select({ name: 1, bookRating: 1, movieRating: 1, owner: 1 })
    .then(response => setTimeout(() => res.json(response), 1000))  // De momento aquí hasta implementar el spinner
    .catch(err => next(err))
})


router.get("/getOneBattle/:Battle_id", (req, res, next) => {

  const { Battle_id } = req.params

  Battle
    .findById(Battle_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/saveBattle", (req, res, next) => {

  const {
    name,
    bookID,
    bookTitle,
    bookAuthor,
    bookRating,
    bookCover,
    bookLanguage,
    bookFirstSentence,
    bookPublishingDate,
    movieID,
    movieTitle,
    movieDirector,
    movieRating,
    moviePoster,
    movieLanguage,
    movieOverview,
    movieReleaseDate
  } = req.body

  Battle
    .create({
      name,
      bookID,
      bookTitle,
      bookAuthor,
      bookRating,
      bookCover,
      bookLanguage,
      bookFirstSentence,
      bookPublishingDate,
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

module.exports = router
