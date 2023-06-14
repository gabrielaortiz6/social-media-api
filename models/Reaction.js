const { Schema, Types } = require('mongoose');

// Schema to create a course model
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true,
      ref: 'user'
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
