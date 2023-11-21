import mongoose from "mongoose";

const audioFileSchema = {
  name: {
    type: String,
    required: true,
    enum: ['lowFrequency', 'fingerStyle', 'pick', 'strumming', 'chord', 'style1', 'style2', 'style3', 'style4', 'style5'],
  },
  file: {
    type: String,
    required: true,
  },
  
};

const guitarSchema = new mongoose.Schema({
  guitarName: {
    type: String,
    required: true,
  },
  guitarPic: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum:["acoustic","electric"]
  },
  artist: {
    type: String,
    required: true,
  },
  brand:{
    type: String,
    required: true,
  },
  material:{
    type: String,
    required: true,
  },
  affiliateLink: {
    type: String,
   // required: true,
    match: /^https?:\/\/.+/,
  },
  strings: [audioFileSchema], 
});

const Guitar = mongoose.model('Guitar', guitarSchema);

export default Guitar;
