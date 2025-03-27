'use client';
import { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';

type Props = {
  files: Record<string, string>;
  setFiles: (files: Record<string, string>) => void;
};

export default function Editor({ files, setFiles }: Props) {
  const [active, setActive] = useState(Object.keys(files)[0]);

  const handleChange = (val: string) => {
    setFiles({ ...files, [active]: val });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex bg-stone-800 text-white text-sm px-2">
        {Object.keys(files).map((file) => (
          <button
            key={file}
            className={`px-3 py-2 border-b-2 ${
              active === file
                ? 'border-white text-white'
                : 'border-transparent text-stone-400 hover:text-white'
            }`}
            onClick={() => setActive(file)}
          >
            {file}
          </button>
        ))}
      </div>
      <div className="flex-1">
        <MonacoEditor
          language="html"
          theme="vs-dark"
          value={files[active]}
          onChange={(v) => handleChange(v || '')}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
}
