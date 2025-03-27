'use client';

import { useState } from 'react';
import { sendPrompt } from '../lib/openai';

export default function ChatPanel() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSend = async () => {
        const reply = await sendPrompt(input);
        setResponse(reply);
    };

    return (
        <div className="p-4 space-y-2 w-full h-full">
      <textarea
          className="w-full p-2 border rounded text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          placeholder="Ask the AI..."
      />
            <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Send
            </button>
            <pre className="bg-gray-900 p-2 text-white rounded">{response}</pre>
        </div>
    );
}
