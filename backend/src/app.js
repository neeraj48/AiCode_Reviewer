const express = require("express");
const route = require("./routes/ai.route");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(cors());app.use("/ai", route);

module.exports = app;
