const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const PORT = process.env.PORT || 8080;
const db  = require("./db/database")

app.use(express.static(path.join(__dirname, "./public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

db.sync()
.then(() => {
  console.log("db synced")
  http.listen(PORT, function () {
  console.log("listening on *:here - origin set");
  })
})


