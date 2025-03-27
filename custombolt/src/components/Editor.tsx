'use client';

import Editor from '@monaco-editor/react';
import { useState } from 'react';

export default function CodeEditor() {
    const [code, setCode] = useState('// Start coding...');

    return (
        <div className="h-full w-full">
            <Editor
                height="100vh"
                defaultLanguage="javascript"
                value={code}
                onChange={(val) => setCode(val || '')}
                theme="vs-dark"
            />
        </div>
    );
}
