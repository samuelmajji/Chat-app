import mongoose from "mongoose";

const connectToMonogoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("connected to database");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
  }
};

export default connectToMonogoDB;
