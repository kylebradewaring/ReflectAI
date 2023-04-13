const AIRecall = require('../models/aiRecall');

// Create a new AI recall
async function createAIRecall(data) {
  const aiRecall = new AIRecall(data);
  await aiRecall.save();
  return aiRecall;
}

// Get all AI recalls
async function getAllAIRecalls() {
  return await AIRecall.find({});
}

// Update an AI recall by ID
async function updateAIRecall(id, data) {
  return await AIRecall.findByIdAndUpdate(id, data, { new: true });
}

// Delete an AI recall by ID
async function deleteAIRecall(id) {
  await AIRecall.findByIdAndDelete(id);
}

module.exports = {
  createAIRecall,
  getAllAIRecalls,
  updateAIRecall,
  deleteAIRecall,
};
