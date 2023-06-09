const { Schema, model } = require('mongoose');

const userSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
    friends: [
      {
      type: Schema.Types.ObjectId,
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
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
