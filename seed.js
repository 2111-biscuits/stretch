const {db} = require("./server/db");
const { arts, artists } = require("./server/db/dummyData");
const Artist = require("./server/db/models/Artist");
const Art = require("./server/db/models/Art");

const seed = async () => {
  try {
    await db.sync({ force: true });

    const art = await Promise.all(
      arts.map((art) => {
        return Art.create(art);
      })
    );
    const artist = await Promise.all(
      artists.map((artist) => {
        return Artist.create(artist);
      })
    );
    await art[0].setArtist(artist[0])
    await art[1].setArtist(artist[0])
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log("Seeding success!");
      db.close();
    })
    .catch((err) => {
      console.error("Oh no! Something went wrong!");
      console.error(err);
      db.close();
    });
}
