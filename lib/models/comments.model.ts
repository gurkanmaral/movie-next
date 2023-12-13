import mongoose from "mongoose"


const commentSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mediaId: { type: Number, required: true }, // ID of the movie or TV show
    mediaType: { type: String, required: true, },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    likes:[
      {
        userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        createdAt: { type:Date ,default:Date.now},
      }
    ]
  });

const Comment = mongoose.models.Comment || mongoose.model('Comment',commentSchema);

export default Comment;
