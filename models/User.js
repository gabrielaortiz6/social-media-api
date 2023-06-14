const { Schema, model } = require('mongoose');
//const assignmentSchema = require('./Assignment');

// Schema to create Student model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 20,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      max_length: 30,
      unique: true,
      match: /^\S+@\S+\.\S+$/
    },
    thoughts: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
    friends: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);

//add virtual somewhere of friendCount
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
