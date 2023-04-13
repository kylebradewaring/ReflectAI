require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { fetchGptResponse } = require('./serverApi.js');
const { connectToDB, RecallInfo, UserResponse } = require('./db');

const port = process.env.PORT || 5000;

connectToDB(process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

app.post('/api/gpt-response', async (req, res) => {
  try {
    const conversationHistory = req.body.conversationHistory;
    const gptResponse = await fetchGptResponse(conversationHistory);
    res.send({ response: gptResponse });
  } catch (error) {
    console.error('Error fetching GPT response:', error);
    res.status(500).send({ error: 'Error fetching response' });
  }
});

// AI recall information endpoints
app.get('/api/recall-info', async (req, res) => {
  const recallInfos = await RecallInfo.find();
  res.json(recallInfos);
});

app.post('/api/recall-info', async (req, res) => {
  const recallInfo = new RecallInfo(req.body);
  await recallInfo.save();
  res.json(recallInfo);
});

app.put('/api/recall-info/:id', async (req, res) => {
  const recallInfo = await RecallInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(recallInfo);
});

app.delete('/api/recall-info/:id', async (req, res) => {
  await RecallInfo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

// User responses endpoints
app.get('/api/user-response', async (req, res) => {
  const userResponses = await UserResponse.find();
  res.json(userResponses);
});

app.post('/api/user-response', async (req, res) => {
  const userResponse = new UserResponse(req.body);
  await userResponse.save();
  res.json(userResponse);
});

app.put('/api/user-response/:id', async (req, res) => {
  const userResponse = await UserResponse.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(userResponse);
});

app.delete('/api/user-response/:id', async (req, res) => {
  await UserResponse.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
