const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "../public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const server = http.listen(PORT, function () {
  console.log("listening on *:here - origin set");
});

// setting up socket
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.userData = { x: 0, y: 0, z: 0 }; //Default values;

  console.log(`${socket.id} connected`);
  socket.emit("setId", { id: socket.id });

  socket.on("disconnect", function () {
    console.log(`Player ${socket.id} disconnected`);
    socket.broadcast.emit("deletePlayer", { id: socket.id });
  });

  socket.on("init", function (data) {
    console.log(`socket.init ${data.model}`);
    socket.userData.model = data.model;
    socket.userData.x = data.x;
    socket.userData.y = data.y;
    socket.userData.z = data.z;
    socket.userData.pb = data.pb;
  });

  socket.on("update", function (data) {
    socket.userData.x = data.x;
    socket.userData.y = data.y;
    socket.userData.z = data.z;
    socket.userData.pb = data.pb;
  });
});

setInterval(function () {
  const nsp = io.of("/");
  let pack = [];

  for (let id in io.sockets.sockets) {
    const socket = nsp.connected[id];
    //Only push sockets that have been initialised
    if (socket.userData.model !== undefined) {
      pack.push({
        id: socket.id,
        x: socket.userData.x,
        y: socket.userData.y,
        z: socket.userData.z,
        pb: socket.userData.pb,
      });
    }
  }
  if (pack.length > 0) io.emit("remoteData", pack);
}, 40);
