const express = require("express");

const gamesRoute = require("../routes/gamesRouter");

const server = express();

server.use(express.json());

server.use("/api/games", gamesRoute);

server.get("/", (req, res) => {
  res.status(200).json("SERVER IS RUNNING");
});

module.exports = server;
