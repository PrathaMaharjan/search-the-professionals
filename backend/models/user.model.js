import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  profilePicture: {
    url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
});

const User = model("User", userSchema);
export default User;
