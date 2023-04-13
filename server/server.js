const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const API_KEY = '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'; // Replace with your OpenAI API key
const GPT_URL = 'https://api.openai.com/v1/chat/completions';

app.post('/api/completions', async (req, res) => {
  try {
    const response = await axios.post(GPT_URL, req.body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
    });
    res.send(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).send({ error: 'An error occurred while fetching completions' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
