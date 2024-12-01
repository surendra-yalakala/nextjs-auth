import mongoose from "mongoose";

const connectToDb = async () => {
  const url = "";

  mongoose
    .connect(url)
    .then(() => console.log("DB connected"))
    .catch((e) => console.log(e));
};

export default connectToDb;
