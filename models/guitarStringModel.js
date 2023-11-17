import mongoose from "mongoose";

const audioFileSchema = {
  name: {
    type: String,
    required: true,
    enum: ['lowFrequency', 'fingerStyle', 'pick', 'strumming', 'chord'],
  },
  file: {
    type: String,
    required: true,
  },
  affiliateLink: {
    type: String,
   // required: true,
    match: /^https?:\/\/.+/,
  },
};

const guitarStringSchema = new mongoose.Schema({
  guitarName: {
    type: String,
    required: true,
  },
  strings: [audioFileSchema], // Now it's an array of audio files
});

const GuitarString = mongoose.model('GuitarString', guitarStringSchema);

export default GuitarString;
