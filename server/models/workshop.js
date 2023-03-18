const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    expertise: {
      type: String,
      required: true,
    },
    orgs: {
      type: Array,
      required: true,
    },
    acceptedRequests: {
      type: Array,
      required: false,
    },
    strengths: {
      type: Array,
      required: true,
    },
    mentorshipProp: {
      type: String,
      required: true,
    },
    partnerPic: {
      type: String,
      required: false,
    },
    pic: {
      type: String,
      required: false,
    },
    mentorshipRequests: {
      type: Array,
      required: false,
    },
    currentMentees: {
      type: Array,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    uniqueCode: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Workshop = mongoose.model("Workshop", workshopSchema);
module.exports = Workshop;
