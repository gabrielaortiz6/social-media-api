const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

//get one User by id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    //.populate('thoughts').populate('friends');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// post a new user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// put to update a user by its _id
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

// delete to remove a user by its _id
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Remove user's associated thoughts
    await Thought.deleteMany({ username: req.params.userId });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// POST to add a new friend to a user's friend list
const addFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }
    user.friends.push(friend._id);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE to remove a friend from a user's friend list
const removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friendIndex = user.friends.indexOf(req.params.friendId);
    if (!user || friendIndex === -1) {
      return res.status(404).json({ error: 'User or friend not found' });
    }
    user.friends.splice(friendIndex, 1);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
