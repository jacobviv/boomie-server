const router = require("express").Router()

const User = require('./../models/User.model')


router.get("/details/:User_id", (req, res, next) => {

    const { User_id } = req.params

    User
        .findById(User_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.put('/edit/:User_id', (req, res, next) => {

    const { username, email, avatar } = req.body
    const { User_id } = req.params

    User
        .findByIdAndUpdate(User_id, { username, email, avatar })
        .then(response => res.json(response))
        .catch(err => next(err))
})

router.delete('/delete/:User_id', (req, res, next) => {

    const { User_id } = req.params

    User
        .findByIdAndDelete(User_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})


module.exports = router