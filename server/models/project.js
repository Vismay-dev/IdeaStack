const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    admin: {
        type:Object,
        required:true
    },
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
 
    maxCap: {
      type: String,
      required: true
    },
    problem: {
      type: String,
      required: true
    },
    projPic: {
      type: String,
      required: true
    }

  },
  { timestamps: true })

const Project = mongoose.model('Project', projectSchema)
module.exports = Project