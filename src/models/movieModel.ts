import mongoose, { Document } from "mongoose";

export interface Movie extends Document {
  _id: mongoose.Types.ObjectId;
  poster: string;
  title: string;
  description: string;
  rating: number;
  genre: string[];
  duration: number;
  releaseDate: string;
  language: string;
}

const movieSchema = new mongoose.Schema<Movie>({
  poster: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model<Movie>("Movie", movieSchema);

export default Movie;
