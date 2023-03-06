const router = require("express").Router()

const Book = require('../models/Book.model')

router.get("/getAllBooks", (req, res, next) => {

  Book
    .find()
    .sort({ name: 1 })
    .select({ name: 1, bookRating: 1, owner: 1 })
    .then(response => setTimeout(() => res.json(response), 1000))  // De momento aquí hasta implementar el spinner
    .catch(err => next(err))
})


router.get("/details/:Book_id", (req, res, next) => {

  const { Book_id } = req.params

  Book
    .findById(Book_id)
    .then(response => res.json(response))
    .catch(err => next(err))
})


router.post("/saveBook", (req, res, next) => {

  const {
    bookID,
    bookTitle,
    bookAuthor,
    bookRating,
    bookCover,
    bookLanguage,
    bookFirstSentence,
    bookPublishingDate
  } = req.body

  Book
    .create({
      bookID,
      bookTitle,
      bookAuthor,
      bookRating,
      bookCover,
      bookLanguage,
      bookFirstSentence,
      bookPublishingDate
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
