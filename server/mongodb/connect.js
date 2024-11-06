import mongoose from "mongoose";

const connectDb = (uri) => {
  mongoose.set("strictQuery", true);

  mongoose
    .connect(uri)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));
};

export default connectDb;
