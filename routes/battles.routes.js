const router = require("express").Router()

const Battle = require('./../models/Battle.model')

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


router.post("/create", verifyToken, (req, res, next) => {

  const { name, bookID, movieID } = req.body
  const { _id: owner } = req.payload

  Battle
    .create({ name, bookID, movieID, owner })
    .then(response => res.json(response))
    .catch(err => next(err))
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


module.exports = router
