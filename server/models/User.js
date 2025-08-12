import mongoose from "mongoose";
import bcrypt from "bcryptjs";
 const UserSchema = new mongoose.Schema({
    username: {
    type: String,
    required: true,
    unique: true,
  },
    password: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
    unique: true,
  },
    refreshToken: {
    type: String,
    default: null,
  },
    createdAt: {
    type: Date,
    default: Date.now,
  }
});

const User = mongoose.model("User", UserSchema);
export default User;
