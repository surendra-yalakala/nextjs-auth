import mongoose from "mongoose";

const UserShema = mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

const User = mongoose.models.User || mongoose.model("User", UserShema);

export default User;
