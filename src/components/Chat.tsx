import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { MessageCircle, Send } from 'lucide-react';
import Groq from 'groq-sdk';
import ReactMarkdown from 'react-markdown';


const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

// Initialize Groq SDK
const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });

export default function Chat() {
  const { messages, addMessage } = useStore(); // Assuming `useStore` handles chat messages
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user's message to the chat
    const userMessage = {
      id: Date.now().toString(),
      content: newMessage,
      author: 'User',
      timestamp: new Date(),
    };
    addMessage(userMessage);
    setNewMessage('');
    setLoading(true);

    try {
      // Build messages array for Groq with a system prompt
      const context = messages.map(({ content, author }) => ({
        role: author === 'User' ? 'user' : 'assistant',
        content,
      }));

      const systemPrompt = {
        role: 'system',
        content: `Sei un assistente che risponde sempre in italiano. Dai consigli su come riciclare correttamente i rifiuti e dove buttarli. Inoltre, per i rifiuti riciclabili, suggerisci idee creative e semplici su come possono essere trasformati in oggetti artistici, specificatamente adatti ai bambini. 
                  
      Assicurati che le tue risposte siano formattate in modo chiaro e leggibile:
      - Usa liste puntate o numerate per indicazioni pratiche.
      - Includi titoli per sezioni importanti.
      - Mantieni un tono semplice e adatto ai bambini.`,
      };

      const messagesForGroq = [systemPrompt, ...context, { role: 'user', content: newMessage }];

      // Call Groq directly
      const chatCompletion = await groq.chat.completions.create({
        messages: messagesForGroq,
        model: 'llama3-8b-8192', // Specify the Llama model
      });

      // Get the assistant's reply
      const reply = chatCompletion.choices[0]?.message?.content || 'Nessuna risposta dall\'assistente.';

      // Add assistant's response to the chat
      const assistantMessage = {
        id: Date.now().toString(),
        content: reply,
        author: 'Assistant',
        timestamp: new Date(),
      };
      addMessage(assistantMessage);
    } catch (error) {
      console.error('Error fetching assistant response:', error.message || error);
      const errorMessage = {
        id: Date.now().toString(),
        content: 'Spiacenti, qualcosa è andato storto. Riprova più tardi.',
        author: 'Assistant',
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[600px] flex flex-col bg-white rounded-lg shadow-md">
      <div className="p-4 border-b flex items-center gap-2">
        <MessageCircle className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Community Chat</h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col">
            <div
              className={`rounded-lg p-3 ${
                message.author === 'User'
                  ? 'bg-blue-100 self-end'
                  : 'bg-gray-100 self-start'
              }`}
            >
              <p className="font-medium text-sm">{message.author}</p>
              <ReactMarkdown className="prose prose-sm max-w-none">
                {message.content}
              </ReactMarkdown>
              <p className="text-xs text-gray-500">
                {new Date(message.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="self-start bg-gray-100 rounded-lg p-3">
            <p className="font-medium text-sm">Assistant</p>
            <p className="italic text-gray-500">Scrivendo...</p>
          </div>
        )}
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 rounded-lg border p-2"
            placeholder="Scrivi il tuo messaggio..."
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            disabled={loading || !newMessage.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}