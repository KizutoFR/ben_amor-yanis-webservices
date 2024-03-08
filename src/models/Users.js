import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({
  lastName : {
    type: String,
    required: true,
  }, 
  firstName: {
    type: String,
    required: true,
  }, 
  email: { 
    type:String,  
    required:true, 
    unique:true,
  },
  password:{ 
    type:String,
    required:true,
    select:false, 
  },  
  skills:[{
    type: Schema.Types.ObjectId,
    ref: "skills"
  }],
  roles:{
    type: String,
    enum: ['admin','user'],
  },
  refreshToken:{
    type: String,
  },
},
{ timestamps: true }
);

const userModel = mongoose.model('users',userSchema)

export default userModel