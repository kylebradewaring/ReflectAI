require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { fetchGptResponse } = require('./serverApi.js');

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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
