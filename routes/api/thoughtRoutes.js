const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  removeReaction,
} = require('../controllers/thoughtController');

// get all thoughts
router.get('/', getAllThoughts);

// get a single thought by id
router.get('/:thoughtId', getThoughtById);

//post a new thought
router.post('/', createThought);

// update/put a thought by id
router.put('/:thoughtId', updateThought);

//delete a thought (by id)
router.delete('/:thoughtId', deleteThought);

// create/post reaction  in a single thought's reaction array
router.post('/:thoughtId/reactions', createReaction);

// delete a reaction
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;

// // /api/courses
// router.route('/').get(getCourses).post(createCourse);

// // /api/courses/:courseId
// router
//   .route('/:courseId')
//   .get(getSingleCourse)
//   .put(updateCourse)
//   .delete(deleteCourse);

// module.exports = router;
