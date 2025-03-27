import CodeEditor from '../components/Editor';
import ChatPanel from '../components/ChatPanel';

export default function HomePage() {
    return (
        <main className="flex h-screen w-full">
            <div className="w-2/3 border-r border-gray-700">
                <CodeEditor />
            </div>
            <div className="w-1/3">
                <ChatPanel />
            </div>
        </main>
    );
}
