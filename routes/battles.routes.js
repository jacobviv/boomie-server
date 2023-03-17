const router = require("express").Router()

const Battle = require('./../models/Battle.model')
const User = require('./../models/User.model')
const Book = require('../models/Book.model')
const Movie = require('../models/Movie.model')


const { verifyToken } = require("../middlewares/verifyToken")

router.get("/getAllBattles", (req, res, next) => {

  Battle
    .find()
    .sort({ name: 1 })
    .select({ name: 1, bookID: 1, movieID: 1, owner: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/details/:Battle_id", (req, res, next) => {

  const { Battle_id } = req.params

  Battle
    .findById(Battle_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.get('/getBattlesInfo', (req, res, next) => {

  Battle
    .find()
    .select({ book: 1, movie: 1 })
    .populate({
      path: 'book',
      select: 'bookRating'
    })
    .populate({
      path: 'movie',
      select: 'movieRating'
    })
    .then(response => {

      const total = response.length
      let bookTotalRating = response.map(((elm, idx) => {
        console.log(idx)
        return Number(elm?.book?.bookRating)
      }))
      bookTotalRating = +bookTotalRating.reduce((acc, curr) => acc + curr).toFixed(2)
      let movieTotalRating = response.map(((elm, idx) => {
        console.log(idx)
        return Number(elm?.movie?.movieRating)
      }))
      movieTotalRating = +movieTotalRating.reduce((acc, curr) => acc + curr).toFixed(2)
      const winner = bookTotalRating > movieTotalRating ? 'books' : 'movies'
      res.json({ winner, bookTotalRating, movieTotalRating, total })

    })
    .catch(err => next(err))
})



router.post("/create", verifyToken, (req, res, next) => {

  const { name, bookID, movieID, book, movie } = req.body
  const { _id: owner } = req.payload
  const battles = owner.battles
  const promises = [Movie.findOne({ movieID: movieID }), Book.findOne({ bookID: bookID })]

  Promise
    .all(promises)
    .then(([movie, book]) => {

      Battle
        .create({ name, bookID, movieID, owner, book: book._id, movie: movie._id })
        .then(battle => {
          User
            .findByIdAndUpdate(owner, { $addToSet: { battles: battle._id } }, { new: true })
            .then(response => res.status(200).json(response))
            .catch(err => next(err))

        })
        .catch(err => next(err))
    })
})

router.put('/edit/:Battle_id', (req, res, next) => {

  const { name, bookID, movieID } = req.body
  const { Battle_id } = req.params

  Battle
    .findByIdAndUpdate(Battle_id, { name, bookID, movieID })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.delete('/delete/:Battle_id', (req, res, next) => {

  const { Battle_id } = req.params

  Battle
    .findByIdAndDelete(Battle_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.get("/battlesForCurrentUser/:id", (req, res, next) => {

  const { id } = req.params

  Battle
    .find({ owner: id })
    .sort({ createdAt: -1 })
    .select({ name: 1, bookID: 1, movieID: 1, owner: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})




module.exports = router
