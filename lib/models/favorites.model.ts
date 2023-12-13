import mongoose from "mongoose"


const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mediaId: {
    type: Number,
    required: true,
  },
  mediaType: {
    type: String,
    required: true,
  },
});

const Favorite = mongoose.models.Favorite || mongoose.model('Favorite',favoriteSchema);

export default Favorite;
