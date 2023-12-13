import mongoose from "mongoose"


const activitySchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    mediaId: { type: Number }, // ID of the movie or TV show
    mediaType: { type: String },
    actionType: { type: String, required: true },
    rating: { type: Number},
    createdAt: { type: Date, default: Date.now },
   
  });

const Activity = mongoose.models.Activity || mongoose.model('Activity',activitySchema);

export default Activity;
