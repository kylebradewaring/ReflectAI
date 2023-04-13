const UserResponse = require('../models/userResponse');

// Create a new user response
async function createUserResponse(data) {
  const userResponse = new UserResponse(data);
  await userResponse.save();
  return userResponse;
}

// Get all user responses
async function getAllUserResponses() {
  return await UserResponse.find({});
}

// Update a user response by ID
async function updateUserResponse(id, data) {
  return await UserResponse.findByIdAndUpdate(id, data, { new: true });
}

// Delete a user response by ID
async function deleteUserResponse(id) {
  await UserResponse.findByIdAndDelete(id);
}

module.exports = {
  createUserResponse,
  getAllUserResponses,
  updateUserResponse,
  deleteUserResponse,
};
