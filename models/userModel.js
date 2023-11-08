import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     fullname: {
        type: String,
        required: [true,"Fullname is required"]
        
      },
      email: {
        type: String,
        required: [true,"Email is required"]
        
      },
      password: {
        type: String,
        required: [true,"Password is required"]
      },
      mobile: {
        type: Number,
        required: [true,"Mobile number is required"]
        
      },
      role:{
        type: String,
        enum: [ "user","admin"],
        default: "user",
      },
      
},{
    timestamps:true,
});

const userModel = mongoose.model("user",userSchema);

export default userModel;