import mongoose, { Document } from "mongoose";

export interface Movie extends Document {
  _id: mongoose.Types.ObjectId;
  movieId: mongoose.Types.ObjectId;
  theatreId: mongoose.Types.ObjectId;
  showStartTime: string;
  showEndTime: string;
  date: string;
  availableSeats: number;
  totalSeats: number;
  price: number;
}

const showSchema = new mongoose.Schema<Movie>({
  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  theatreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theatre",
    required: true,
  },
  showStartTime: {
    type: String,
    required: true,
  },
  showEndTime: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Show = mongoose.model<Movie>("Show", showSchema);

export default Show;
