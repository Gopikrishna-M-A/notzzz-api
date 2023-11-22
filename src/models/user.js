import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String },
  creator: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,  
  },
  avatar:{
    type: String,
    default:'girl1'
  },
  ratings: [
    {
      type: Number,
      min: 1,
      max: 5,
    },
  ],
  downloads: {
    type: Number,
    default: 0,
  },
  semester:{
    type: String,
    default: '1'
  },
  branch:{
    type: String,
    default: 'Computer Science and Engineering'

  }
});

userSchema.pre('save', function (next) {
  const totalRating = this.ratings.reduce((sum, rating) => sum + rating, 0);
  const averageRating = this.ratings.length > 0 ? totalRating / this.ratings.length : 0;
  
  // Round the average rating to the nearest integer
  this.rating = Math.round(averageRating);

  // Ensure the rating is between 0 and 5
  this.rating = Math.min(Math.max(this.rating, 0), 5);

  next();
});
const User = mongoose.model("User", userSchema);

export default User;
