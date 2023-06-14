const router = require('express').Router();

//import controller functions for user
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../controllers/userController');

//get all users
router.get('/', getAllUsers);

//get a user by id and populate thought and friend data
router.get('/:userId', getUserById);

//post a new user
router.post('/', createUser);

// update user by id
router.put('/:userId', updateUser);

//delete user
router.delete('/:userId', deleteUser);

// Add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', addFriend);

//delete a friend from a user's friend list
router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;

// // /api/students
// router.route('/').get(getStudents).post(createStudent);

// // /api/students/:studentId
// router.route('/:studentId').get(getSingleStudent).delete(deleteStudent);

// // /api/students/:studentId/assignments
// router.route('/:studentId/assignments').post(addAssignment);

// // /api/students/:studentId/assignments/:assignmentId
// router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);

// module.exports = router;
