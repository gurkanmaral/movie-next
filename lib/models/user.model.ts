import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{type:String,required:true},
    name: {type:String, required:true},
    email: { type: String, required: true }, 
    password: {type:String,required:true},
    image:String,
    bgImage:String,

})

const User = mongoose.models.User || mongoose.model('User',userSchema);

export default User;
