const express = require("express");

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected with ID:", socket.id); // This should print when a client connects

  socket.on("disconnect", () => {
    console.log("User disconnected with ID:", socket.id);
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
