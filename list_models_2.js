const openai = require("openai");

openai.apiKey = "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";

openai.Model.list().then((response) => {
  console.log("Available models:");
  response.data.data.forEach((model) => {
    console.log(model.id);
  });
}).catch((error) => {
  console.error("Error:", error);
});