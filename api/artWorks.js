const { Art, Artist } = require("../db")
const router = require("express").Router()

router.get("/", async (req, res, next) => {
  try {
    const allArtworks = await Art.findAll()
    res.send(allArtworks)
  } catch (err) {
    next(err)
  }
})

module.exports = router
