const router = require("express").Router()

const battleRoutes = require("./battles.routes")
router.use("/battles", battleRoutes)

const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)

module.exports = router