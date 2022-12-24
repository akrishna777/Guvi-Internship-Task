import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, default: null },
  gender: { type: String, default: null },
  mobile: { type: String, default: null },
  addressLine1: { type: String, default: null },
  addressLine2: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  pincode: { type: String, default: null },
  country: { type: String, default: null },
})

const User = mongoose.model('User', userSchema)

export default User
