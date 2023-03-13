const router = require("express").Router()
const Book = require('../models/Book.model')
const axios = require('axios')


const apiOL = axios.create({
  baseURL: 'http://openlibrary.org'
})


router.get("/api/search/:bookTitle", (req, res, next) => {

  const { bookTitle } = req.params

  apiOL.get(`/search.json?q=${bookTitle}`)
    .then(({ data }) => {
      res.send(data)
    })
    .catch(err => next(err))
})

router.get("/api/load/:bookKey", (req, res, next) => {

  const { bookKey } = req.params

  apiOL.get(`/books/${bookKey}.json`)
    .then(({ data }) => {
      res.send(data)
    })
    .catch(err => next(err))
})

router.get("/getAllBooks", (req, res, next) => {

  Book
    .find()
    .sort({ name: 1 })
    .select({ name: 1, bookRating: 1, owner: 1 })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.get("/details/:Book_id", (req, res, next) => {

  const { Book_id } = req.params

  Book
    .findById(Book_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.get("/detailsByKey/:Book_key", (req, res, next) => {

  const { Book_key } = req.params

  Book
    .findOne({ bookID: Book_key })
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/saveBook", (req, res, next) => {
  const {
    key,
    title,
    author_name,
    ratings_average,
    excerpt,
    first_publish_date
  } = req.body

  Book
    .create({
      bookID: key.replace('/works/', ''),
      bookTitle: title,
      bookAuthor: author_name[0],
      bookRating: ratings_average,
      bookFirstSentence: excerpt ?? 'dummy',
      bookPublishingDate: first_publish_date,
      bookCover: 'dummy',
      bookLanguage: 'dummy',
    })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.put('/edit/:Book_id', (req, res, next) => {

  const { bookTitle, bookAuthor, bookLanguage, bookFirstSentence } = req.body
  const { Book_id } = req.params

  Book
    .findByIdAndUpdate(Book_id, { bookTitle, bookAuthor, bookLanguage, bookFirstSentence })
    .then(response => res.json(response))
    .catch(err => next(err))
})

router.delete('/delete/:Book_id', (req, res, next) => {

  const { Book_id } = req.params

  Book
    .findByIdAndDelete(Book_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


module.exports = router
