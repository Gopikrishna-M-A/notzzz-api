import mongoose from 'mongoose';

const semesterSchema = new mongoose.Schema({
  name: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 8,
  },
});

const Semester = mongoose.model('Semester', semesterSchema);

export default Semester

