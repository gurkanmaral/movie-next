import mongoose from "mongoose"


const WatchedSchema = new mongoose.Schema({
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
    default: Date.now, // Default value is the current date and time
  },
});

const Watched = mongoose.models.Watched || mongoose.model('Watched',WatchedSchema);

export default Watched;
