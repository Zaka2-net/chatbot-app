import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  userId: string;
  email: string;
  name: string;
  lastLogin: Date;
  picture?: string;
}

const UserSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  lastLogin: { type: Date, required: true, default: Date.now },
  email: { type: String },
  picture: { type: String }
});

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
