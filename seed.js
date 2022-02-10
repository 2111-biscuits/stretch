const {db} = require("./db");
const { arts, artists } = require("./db/dummyData");
const Artist = require("./db/models/Artist");
const Art = require("./db/models/Art");

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      arts.map((art) => {
        return Art.create(art);
      })
    );
    await Promise.all(
      artists.map((artist) => {
        return Artist.create(artist);
      })
    );
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
