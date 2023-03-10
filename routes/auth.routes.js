const router = require("express").Router()

const bcrypt = require('bcryptjs')
const User = require("../models/User.model")

const jwt = require('jsonwebtoken')
const { verifyToken } = require("../middlewares/verifyToken")

router.post('/signup', (req, res, next) => {

    const { username, email, password, avatar } = req.body

    User
        .create({ username, email, password, avatar })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})


router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: "Provide email and password." })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: "User not found." })
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, username, avatar, role, battles, books, movies, comments } = foundUser
                // desestructuramos el foundUser
                const payload = { _id, email, username, avatar, role, battles, books, movies, comments }
                // payload = Información que tenemos en cliente para renderizado condicional

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "2h" }
                )

                res.status(200).json({ authToken })
            }
            else {
                res.status(401).json({ message: "Unable to authenticate the user" })
            }

        })
        .catch(err => next(err))
})

router.get('/verify', verifyToken, (req, res, next) => {
    res.json(req.payload)
})

module.exports = router
