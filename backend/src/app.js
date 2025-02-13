const express = require("express");
const route = require("./routes/ai.route");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/ai", route);

module.exports = app;
