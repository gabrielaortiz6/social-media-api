const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    username: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    reactions: [reactionSchema]
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  {
    toJSON: { virtuals: true },
    id: false
  }
);

//add virtual of reaction count
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);
module.exports = Thought;
