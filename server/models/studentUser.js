const mongoose = require('mongoose')

const studentUserSchema = new mongoose.Schema({
   
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    age: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    school: {
      type: String,
      required: true
    },
    description: {
      type:String,
      required:false
    },
    projects: {
      type: Array,
      required:false
    },
    profilePic: {
      type: String,
      required: false
    },
    interests: {
      type:Array,
      required:false
    }
  })

const StudentUser = mongoose.model('StudentUser', studentUserSchema)
module.exports = StudentUser