import express from 'express';
import Groq from 'groq-sdk';


// Initialize Express
const app = express();
app.use(express.json());

const GROQ_API_KEY = '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'; // Replace with your API key

// Initialize the Groq SDK
const groq = new Groq({ apiKey: GROQ_API_KEY });

/**
 * Function to get chat completion from Groq
 */
async function getGroqChatCompletion(messages) {
  return groq.chat.completions.create({
    messages, // Pass the messages array to maintain conversation context
    model: 'llama3-8b-8192', // Specify the Llama model
  });
}

// API route to handle chat requests
app.post('/chat', async (req, res) => {
  const { message, context = [] } = req.body;

  // Validate the input
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Invalid message. Message must be a non-empty string.' });
  }

  try {
    // Build the messages array with context and the user's new message
    const messages = [
      ...context, // Include prior conversation context
      { role: 'user', content: message }, // Add the current user message
    ];

    // Get chat completion from Groq
    const chatCompletion = await getGroqChatCompletion(messages);

    // Extract and return the assistant's response
    const assistantReply = chatCompletion.choices[0]?.message?.content || 'No response from assistant';
    res.json({ reply: assistantReply });
  } catch (error) {
    console.error('Error connecting to the Groq API:', error.message);
    res.status(500).json({
      error: 'Failed to fetch response from the Groq API.',
      details: error.message,
    });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
