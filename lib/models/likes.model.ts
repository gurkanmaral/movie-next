import mongoose from "mongoose"


const LikeSchema = new mongoose.Schema({
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
  createdAt: { type: Date, default: Date.now },
});

const Like = mongoose.models.Like || mongoose.model('Like',LikeSchema);

export default Like;
