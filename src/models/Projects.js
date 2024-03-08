import mongoose from 'mongoose';
const { Schema } = mongoose;


const projectSchema = new Schema({
  name : {
    type: String,
    required: true,
  },
  description : {
    type: String,
  },
  skills:[{
    type: Schema.Types.ObjectId,
    ref: "skills"
  }],
  members:[{
    type: Schema.Types.ObjectId,
    ref: "users",
  }],
},
{ timestamps: true }
);

const projectModel = mongoose.model('projects',projectSchema)

export default projectModel