import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  module: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 10,
  },
  pdfPath: String,
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
  semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
});

const Module = mongoose.model("Module", moduleSchema);

export default Module;

