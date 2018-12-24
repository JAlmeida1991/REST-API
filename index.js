require("./db");

const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", router);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", {
    date: moment().format("MMM Do YYYY")
  });
});

app.listen(port, () => console.log(`Server has started on port ${port}`));
