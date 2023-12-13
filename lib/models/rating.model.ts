import mongoose from "mongoose"


const RatingSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mediaId: { type: Number, required: true }, // ID of the movie or TV show
    mediaType: { type: String, required: true }, // Movie, TV Show, etc.
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
  });

const Rating = mongoose.models.Rating || mongoose.model('Rating',RatingSchema);

export default Rating;
