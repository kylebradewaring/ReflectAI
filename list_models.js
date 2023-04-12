const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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", // Replace this with your API key
});
const openai = new OpenAIApi(configuration);

// Create an async function to list models
async function listModels() {
  try {
    const response = await openai.listModels();
    console.log(response.data.data);
  } catch (error) {
    console.error('Error fetching models:', error);
  }
}

listModels()