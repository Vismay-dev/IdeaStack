const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    background: {
      type: String,
      required: true,
    },
    mentors: {
      type: Array,
      required: true,
    },
    strengths: {
      type: Array,
      required: true,
    },
    mentorshipProp: {
      type: String,
      required: true,
    },
    contact: {
      type: Array,
      required: true,
    },
    org: {
      type: Array,
      required: false,
    },
    pics: {
      type: Array,
      required: true,
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
  },
  { timestamps: true }
);

const Workshop = mongoose.model("Workshop", workshopSchema);
module.exports = Workshop;
