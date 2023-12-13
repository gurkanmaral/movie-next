import mongoose from "mongoose"


const WatchlistSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const Watchlist = mongoose.models.Watchlist || mongoose.model('Watchlist',WatchlistSchema);

export default Watchlist;
