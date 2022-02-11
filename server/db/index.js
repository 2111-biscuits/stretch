const db = require("./database");
const Art = require("./models/Art");
const Artist = require("./models/Artist");

Art.belongsTo(Artist);
Artist.hasMany(Art);

module.exports = {
  db,
  Art,
  Artist
};
