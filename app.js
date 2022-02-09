const express = require("express");
const app = express();
const path = require("path");
const http = require("http").Server(app);
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, "./public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

const server = http.listen(PORT, function () {
  console.log("listening on *:here - origin set");
});

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log(`Connection from client ${socket.id}`);

  socket.on("enter", () => {
    socket.join("gallery");
    console.log("socket is joining gallery");
  });

  socket.on("leaveGallery", () => {
    socket.leave("gallery");
    console.log("socket " + socket.id + "is leaving gallery");
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`);
  });
});
