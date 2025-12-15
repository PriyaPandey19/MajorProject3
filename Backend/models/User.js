import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    uid:{type: String, required: true, unique:true},
    name:String,
    email:String,
    photoURL:String,
    provider:String,
    createdAt:Date
});

export default mongoose.model("User",UserSchema);   