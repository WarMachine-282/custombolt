'use client';

import { useState } from 'react';

type Props = {
  messages: { role: 'user' | 'assistant'; content: string }[];
};

export default function HistoryPanel({ messages }: Props) {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggle = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="p-4 overflow-auto h-full bg-stone-900 text-stone-100 text-sm border-l border-stone-800">
      <h2 className="font-bold text-lg mb-4 text-stone-200">Prompt History</h2>
      <ul className="space-y-3">
        {messages.map((msg, i) => (
          <li key={i} className="bg-stone-800 p-3 rounded">
            <div className="flex justify-between items-start">
              <span
                className={`font-semibold uppercase text-xs tracking-wider ${
                  msg.role === 'user' ? 'text-stone-400' : 'text-stone-300'
                }`}
              >
                {msg.role}
              </span>
              {msg.role === 'assistant' && (
                <button
                  onClick={() => toggle(i)}
                  className="text-xs text-stone-400 hover:text-stone-200 underline ml-2"
                >
                  {expanded[i] ? 'Collapse' : 'Expand'}
                </button>
              )}
            </div>
            <p
              className="mt-2 text-stone-200 whitespace-pre-wrap cursor-pointer"
              onClick={() => msg.role === 'assistant' && toggle(i)}
            >
              {msg.role === 'assistant' && !expanded[i]
                ? msg.content.slice(0, 200) + (msg.content.length > 200 ? '...' : '')
                : msg.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
