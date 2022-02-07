const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "./public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

http.listen(PORT, function () {
<<<<<<< HEAD
  console.log("listening on *:HERE - origin set");
=======
  console.log("listening on *:here - origin set");
>>>>>>> 16c05a2f570f664b4ba5ce69aeb0715a10034122
});
