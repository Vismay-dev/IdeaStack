const mongoose = require("mongoose");

const studentUserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  isAdditionalMember: {
    type: Boolean,
    required: false,
  },
  initialized: {
    type: Boolean,
    required: true,
  },
  initializationStep: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  age: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  university: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  projectId: {
    type: String,
    required: false,
  },
  profilePic: {
    type: String,
    required: false,
  },
  interests: {
    type: Array,
    required: false,
  },
  joinRequests: {
    type: Array,
    required: false,
  },
  pendingPayments: {
    type: Array,
    required: false,
  },
  notifications: {
    type: Array,
    required: false,
  },
  workshopsOngoing: {
    type: Array,
    required: false,
  },
  workshopsCompleted: {
    type: Array,
    required: false,
  },
});

const StudentUser = mongoose.model("StudentUser", studentUserSchema);
module.exports = StudentUser;
