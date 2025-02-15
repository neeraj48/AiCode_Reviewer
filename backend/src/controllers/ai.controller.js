const aiService = require("../services/ai.service");

const getResponse = async (req, res) => {
  try {
    const prompt = req.body.code;
    if (!prompt) {
      return res.status(400).send("Prompt is required");
    }
    const response = await aiService(prompt);
    return res.status(200).json({ response });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = getResponse;
