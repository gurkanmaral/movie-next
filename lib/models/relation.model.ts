import mongoose from "mongoose"


const RelationSchema = new mongoose.Schema({

    followerUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  });

const Relation = mongoose.models.Relation || mongoose.model('Relation',RelationSchema);

export default Relation;
