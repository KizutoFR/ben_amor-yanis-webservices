import mongoose, { now } from 'mongoose';
const { Schema } = mongoose;


const skillSchema = new Schema({
  label : {
    type:String, 
    required: true
  }
},
{ timestamps: true }
);

const skillModel = mongoose.model('skills',skillSchema)

export default skillModel