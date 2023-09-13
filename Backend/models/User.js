import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = Schema({
  name:{
    type: String,
    requred: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    select: false
  },
  email:{
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  token:{
    type:String,

  },
  confirmed:{
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true
})

userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.validatePassword = async function(passwordForm){
  return await bcrypt.compare(passwordForm, this.password)
}

const User = model("User", userSchema)
export default User