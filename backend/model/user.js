const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required.'],
  },
  email: {
    type: String,
    required: [true, 'email is required.'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true,'password is required.'],
    minlength: [4, 'Minimum password length is 6 characters.']
  },
})

userSchema.pre('save', async function (next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

const User = mongoose.model('user', userSchema)

module.exports = User;