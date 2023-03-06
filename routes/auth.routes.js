const router = require("express").Router()

const bcrypt = require('bcryptjs')
const User = require("../models/User.model")
const saltRounds = 10

const jwt = require('jsonwebtoken')
const { verifyToken } = require("../middlewares/verifyToken")

router.post('/signup', (req, res, next) => {

    const { username, email, password, avatar } = req.body

    if (password.length < 2) {
        res.status(400).json({ message: "Password must have at least 3 characters" })
        return
    }

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: "User already exists." })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ username, email, password: hashedPassword, avatar })
        })
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
                // contraseña no válida
            }

        })
        .catch(err => next(err))
})

router.get('/verify', verifyToken, (req, res, next) => {
    res.json(req.payload)
})

module.exports = router
