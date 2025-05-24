const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(`${process.env.URI}`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};
conn();
