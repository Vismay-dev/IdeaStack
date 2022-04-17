const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    },
    strengths: {
      type: Array,
      required: true
    },
    mentorshipProp: {
      type: String,
      required: true
    },
    contact: {
      type: Array,
      required:true
    },
    pic: {
      type: String,
      required: true
    },
    role:{
      type:String,
      required:true
    },
    pricing: {
      type:Array,
      required:true
    },
    mentorshipRequests : {
      type:Array,
      required:false
    },
    fields: {
      type:Array,
      required : true,
    },
    availableDates: {
      type:Array,
      required:false
    }
  },
  { timestamps: true })

const Mentor = mongoose.model('Mentor', mentorSchema)
module.exports = Mentor