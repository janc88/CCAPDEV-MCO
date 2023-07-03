import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String, required: true},
})

const userModel = mongoose.model('User', UserSchema);

export default userModel;