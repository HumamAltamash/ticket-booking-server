import mongoose, { Document } from "mongoose";

export interface Theatre extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  location: string;
  owner: mongoose.Types.ObjectId;
  phone: string;
  email: string;
  isActive: boolean;
}

const theatreSchema = new mongoose.Schema<Theatre>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Theatre = mongoose.model<Theatre>("Theatre", theatreSchema);

export default Theatre;
