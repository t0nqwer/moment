import mongoose from "mongoose";
let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Mongoose already connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "PrivateProject",
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("Mongoose connected");
  } catch (error) {
    console.log(error);
  }
};
connectToDatabase();
