'use client';

import { useState } from 'react';
import CodeEditor from '../components/Editor';
import ChatPanel from '../components/ChatPanel';
import Preview from '../components/Preview';
import HistoryPanel from '../components/HistoryPanel';
import { parseGeneratedFiles, downloadZip } from '../lib/fileUtils';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [files, setFiles] = useState<Record<string, string>>({
    'index.html': '<h1>Hello World</h1>',
  });
  const [showHistory, setShowHistory] = useState(false);
  const [editorWidth, setEditorWidth] = useState(25); // in %

  const onUpdateHistory = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  const handleSetCode = (newContent: string) => {
    const parsed = parseGeneratedFiles(newContent);
    if (Object.keys(parsed).length > 0) {
      setFiles(parsed);
    } else {
      setFiles({ 'index.html': newContent });
    }
  };

  const handleMouseDown = () => {
    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 10 && newWidth < 90) setEditorWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <main className="h-screen w-screen overflow-hidden flex flex-col bg-stone-950 relative">
      {/* Drag Handle */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute top-0 bottom-0 z-50 bg-stone-700 transition-colors duration-150 hover:bg-stone-600"
        style={{
          left: `${editorWidth}%`,
          width: '5px',
          cursor: 'col-resize',
          userSelect: 'none',
        }}
      />

      <div className="flex flex-1 h-full">
        {/* Left Panel: Editor + Chat */}
        <div
          style={{ width: `${editorWidth}%` }}
          className="flex flex-col bg-stone-950 border-r border-stone-800"
        >
          <div className="flex-1 min-h-0 bg-stone-900">
            <CodeEditor files={files} setFiles={setFiles} />
          </div>
          <div className="h-[25%] border-t border-stone-800 bg-stone-900">
            <ChatPanel
              setCode={handleSetCode}
              onUpdateHistory={onUpdateHistory}
              messages={messages}
            />
          </div>
        </div>

        {/* Right Panel: Preview */}
        <div
          style={{ width: `${100 - editorWidth}%` }}
          className="bg-white overflow-auto"
        >
          <Preview code={files['index.html'] || ''} />
        </div>
      </div>

      {/* History Panel */}
      {showHistory && (
        <div className="absolute top-0 right-0 h-full w-80 bg-stone-900 z-40 border-l border-stone-800 shadow-lg">
          <HistoryPanel messages={messages} />
        </div>
      )}

      {/* Toggle History */}
      <button
        onClick={() => setShowHistory((s) => !s)}
        className="absolute top-4 right-4 bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded z-50"
      >
        {showHistory ? 'Hide History' : 'Show History'}
      </button>

      {/* Export Zip */}
      <button
        onClick={() => downloadZip(files)}
        className="absolute bottom-4 right-4 bg-stone-800 hover:bg-stone-700 text-white px-4 py-2 rounded z-50"
      >
        Export App
      </button>
    </main>
  );
}
