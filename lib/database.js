const mongoose = require("mongoose");
const config = require("../config/index");

function connectToDatabase() {
  const uri = `mongodb+srv://${config.mongoose.url}/${config.mongoose.database}`;

  mongoose.connect(uri, {
    user: config.mongoose.username,
    pass: config.mongoose.password,
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });
}

module.exports = {
  connectToDatabase
};
