'use client';

import { useState } from 'react';
import { sendPrompt } from '../lib/openai';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

type Props = {
  setCode: (val: string) => void;
  onUpdateHistory: (msg: Message) => void;
  messages: Message[];
};

export default function ChatPanel({ setCode, onUpdateHistory, messages }: Props) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    onUpdateHistory(userMessage);
    setInput('');
    setLoading(true);

    try {
      const reply = await sendPrompt([...messages, userMessage]);
      const assistantMessage = { role: 'assistant', content: reply };
      onUpdateHistory(assistantMessage);
      setCode(reply);
    } catch (err) {
      console.error('AI error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full p-3 space-y-2 bg-stone-900 text-white border-t border-stone-800">
      <textarea
        className="w-full p-2 rounded bg-stone-800 text-white border border-stone-700 resize-none placeholder-stone-400"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="Ask the AI..."
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className={`${
          loading
            ? 'bg-stone-600 cursor-wait'
            : 'bg-stone-700 hover:bg-stone-600'
        } transition-colors text-white py-2 px-4 rounded flex items-center gap-2`}
      >
        {loading && (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
        )}
        {loading ? 'Thinking…' : 'Send'}
      </button>
    </div>
  );
}
