const mongoose = require("mongoose");

// DB connection
mongoose
  .connect(
    "mongodb://localhost:27017/rest-api",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB has started..."))
  .catch(err => console.log(err));
