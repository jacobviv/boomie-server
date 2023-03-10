const router = require("express").Router()

const uploaderMiddleware = require("../middlewares/uploader.middleware")

router.post('/image', uploaderMiddleware.single('imageData'), (req, res) => {

    if (!req.file) {
        res.status(500).json({ errorMessage: 'Error uploading archive' })
        return
    }

    res.json({ cloudinary_url: req.file.path })
})


module.exports = router