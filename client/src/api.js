export const fetchGptResponseFromServer = async (conversationHistory) => {
  try {
    const response = await fetch('http://localhost:3001/api/gpt-response', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversationHistory }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.response;
    } else {
      throw new Error('Error fetching GPT response from server');
    }
  } catch (error) {
    console.error('Error fetching GPT response from server:', error);
    return 'Error fetching response';
  }
};