const router = require("express").Router()

const battleRoutes = require("./battles.routes")
router.use("/battles", battleRoutes)

const bookRoutes = require("./books.routes")
router.use("/books", bookRoutes)

const movieRoutes = require("./movies.routes")
router.use("/movies", movieRoutes)

const userRoutes = require("./user.routes")
router.use("/user", userRoutes)

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

const uploadRoutes = require("./upload.routes")
router.use("/upload", uploadRoutes)

module.exports = router