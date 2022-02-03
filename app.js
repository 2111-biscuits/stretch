const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);

app.use(express.static(path.join(__dirname, "./public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

http.listen(8080, function () {
  console.log("listening on *:8080 - origin set");
});
