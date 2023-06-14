const { Schema, Types } = require('mongoose');

// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
