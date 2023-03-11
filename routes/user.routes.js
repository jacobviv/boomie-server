const router = require("express").Router()

const User = require('./../models/User.model')


router.get("/details/:id", (req, res, next) => {

    const { id } = req.params

    User
        .findById(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put('/edit/:id', (req, res, next) => {

    const { username, email, avatar } = req.body
    const { id } = req.params

    User
        .findByIdAndUpdate(id, { username, email, avatar })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete('/delete/:id', (req, res, next) => {

    const { id } = req.params

    User
        .findByIdAndDelete(id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router