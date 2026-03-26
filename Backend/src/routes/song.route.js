const express = require("express")
const upload = require("../middlewares/upload.middleware")
const songController = require("../controllers/song.controller")


const router = express.Router()

/**
 *   @route POTS /api/songs/
 */

router.post("/",upload.single("songs"),songController.uploadSong)
router.get("/",songController.getSong)

module.exports = router