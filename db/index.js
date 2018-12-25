const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/rest-api";

// DB connection
mongoose
  .connect(
    url,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB has started..."))
  .catch(err => console.error(err));
