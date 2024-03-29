const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    admin: {
      type: Object,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    teamOnboarded: {
      type: Boolean,
      required: false,
    },

    maxCap: {
      type: String,
      required: true,
    },
    problem: {
      type: String,
      required: true,
    },
    projPic: {
      type: String,
      required: true,
    },
    accepting: {
      type: Boolean,
      required: false,
    },
    application: {
      type: Array,
      required: false,
    },
    team: {
      type: Array,
      required: true,
    },
    joinRequests: {
      type: Array,
      required: false,
    },
    messages: {
      type: Array,
      required: false,
    },
    documents: {
      type: Array,
      required: false,
    },
    mentorsMatched: {
      type: Array,
      required: false,
    },
    mentorsRequested: {
      type: Array,
      requried: false,
    },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
