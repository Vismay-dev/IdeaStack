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
    links: {
      type: Array,
      required: false,
    },
    expertise: {
      type: String,
      required: true,
    },
    orgs: {
      type: Array,
      required: true,
    },
    strengths: {
      type: Array,
      required: true,
    },
    resources: {
      type: Array,
      required: false,
    },
    mentorshipProp: {
      type: String,
      required: true,
    },
    contact: {
      type: Array,
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
    pricing: {
      type: Array,
      required: true,
    },
    mentorshipRequests: {
      type: Array,
      required: false,
    },
    currentMentees: {
      type: Array,
      required: false,
    },
    availableDates: {
      type: Array,
      required: false,
    },
    assignments: {
      type: Array,
      required: false,
    },
    timeline: {
      type: Array,
      required: false,
    },
    sessions: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

const Workshop = mongoose.model("Workshop", workshopSchema);
module.exports = Workshop;
