import mongoose, { Document, Schema, Types } from "mongoose";

// Define the possible roles as an enum
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
}

// Define an interface for the User model
export interface User extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the user schema
const userSchema: Schema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures the email is unique
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // By default, users are not admins
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const bcrypt = require("bcryptjs");
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const bcrypt = require("bcryptjs");
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = mongoose.model<User>("User", userSchema);

export default User;
