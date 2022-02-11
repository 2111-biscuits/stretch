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

router.get("/:id", async (req, res, next) => {
  try {
    // const art = await Art.findByPk(req.params.id)

    const singleArtwork = await Art.findByPk(req.params.id, {
      include: {
        model: Artist,
        // where: {
        //   name: art.artistName
        // }
      }
    })

    res.send(singleArtwork)
  } catch (err) {
    next(err)
  }
})

module.exports = router