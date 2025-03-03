const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("MONGODB_URI =", process.env.MONGODB_URI);
    console.log("Connected DB name =", conn.connection.name);

    console.log(`Connected to MongoDB successfully: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
