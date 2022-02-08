const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// static middleware
app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use("/api", require("./api"));

//TODO: add styled 404 page
app.use((req, res, next) => {
  const error = Error("page not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

module.exports = app;
