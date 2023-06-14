const { Thought, User } = require('../models');

// GET all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// GET a single thought by its _id
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST to create a new thought
const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    // Push the created thought's _id to the associated user's thoughts array field
    const user = await User.findOne({ username: req.body.username });
    //User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.thoughts.push(newThought._id);
    await user.save();
    res.status(201).json(newThought);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// PUT to update a thought by its _id
const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// DELETE to remove a thought by its _id
const deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST to create a reaction stored in a single thought's reactions array field
const createReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: 'Thought not found' });
    }
    thought.reactions.push(req.body);
    await thought.save();
    res.status(201).json(thought);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// DELETE to pull and remove a reaction by the reaction's reactionId value
const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    const reactionIndex = thought.reactions.findIndex((reaction) => reaction.reactionId === req.params.reactionId);
    if (!thought || reactionIndex === -1) {
      return res.status(404).json({ error: 'Thought or reaction not found' });
    }
    thought.reactions.splice(reactionIndex, 1);
    await thought.save();
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
};

// module.exports = {
//   // Get all courses
//   getCourses(req, res) {
//     Course.find()
//       .then((courses) => res.json(courses))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Get a course
//   getSingleCourse(req, res) {
//     Course.findOne({ _id: req.params.courseId })
//       .select('-__v')
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with that ID' })
//           : res.json(course)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // Create a course
//   createCourse(req, res) {
//     Course.create(req.body)
//       .then((course) => res.json(course))
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
//   // Delete a course
//   deleteCourse(req, res) {
//     Course.findOneAndDelete({ _id: req.params.courseId })
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with that ID' })
//           : Student.deleteMany({ _id: { $in: course.students } })
//       )
//       .then(() => res.json({ message: 'Course and students deleted!' }))
//       .catch((err) => res.status(500).json(err));
//   },
//   // Update a course
//   updateCourse(req, res) {
//     Course.findOneAndUpdate(
//       { _id: req.params.courseId },
//       { $set: req.body },
//       { runValidators: true, new: true }
//     )
//       .then((course) =>
//         !course
//           ? res.status(404).json({ message: 'No course with this id!' })
//           : res.json(course)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
// };
