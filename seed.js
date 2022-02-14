const { db } = require("./server/db");
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
    for (let i = 0; i < 11; i++) {
      if (i <= 1 || (i >= 13 && i < 17)) {
        await art[i].setArtist(artist[0]);
      } else if (i >= 2 && i < 5) {
        await art[i].setArtist(artist[1]);
      } else if (i >= 5 && i < 9) {
        await art[i].setArtist(artist[2]);
      } else if (i >= 9 && i < 12) {
        await art[i].setArtist(artist[3]);
      } else if (i === 12) {
        await art[i].setArtist(artist[4]);
      }
    }
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
