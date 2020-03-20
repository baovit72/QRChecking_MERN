const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./db");
//const movieRouter = require('./routes/movie-router')
const userRouter = require("./routes/user-router");
const checkinRouter = require("./routes/checkin-router");
const app = express();
const apiPort = 2212;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", userRouter);
app.use("/api", checkinRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
