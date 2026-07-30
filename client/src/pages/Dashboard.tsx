import { useEffect, useState } from 'react';
import Chat from '../components/Chat/Chat';
import Settings from '../components/Chat/ChatSettings/Settings';
import AddProvider from '../components/Chat/ChatSettings/providerCRUD/AddProvider';
import PutProvider from '../components/Chat/ChatSettings/providerCRUD/PutProvider';
import RemoveProvider from '../components/Chat/ChatSettings/providerCRUD/RemoveProvider';
import Sessions from '../components/Chat/ChatSessions/Sessions';
import { type Message } from '../components/Chat/classes/Messages';

export default function Dashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [showPutProvider, setShowPutProvider] = useState(false);
  const [showRemoveProvider, setShowRemoveProvider] = useState(false);
  const [sessionsOpen, setSessionsOpen] = useState(false);
  const [providers, setProviders] = useState<string[]>([]);
  const [chatConfig, setChatConfig] = useState(() => {
  const saved = localStorage.getItem("chatConfig");

  return saved
    ? JSON.parse(saved)
    : {
        provider: "",
        model: "",
      };
});

useEffect(() => {
  localStorage.setItem("chatConfig", JSON.stringify(chatConfig));
}, [chatConfig]);

  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [sessionName, setSessionName] = useState<string>("Default");
  const loadProviders = async () => {
  try {
    const res = await fetch("http://localhost:3000/providers");
    const data: string[] = await res.json();
    setProviders(data);
  } catch (err) {
    console.error(err);
    }
  };

  useEffect(() => {
  loadProviders();
}, []);
    return (
      <main className="flex h-full min-h-0 flex-col bg-gray-950 p-2 text-white">
        
        <div className="grid flex-1 min-h-0 grid-cols-12 gap-6">
          <div className="col-span-3 min-h-0">
            <Chat isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} chatConfig={chatConfig} sessionsOpen={sessionsOpen} setSessionsOpen={setSessionsOpen} messages={messages} setMessages={setMessages} sessionId={sessionId} setSessionId={setSessionId} sessionName={sessionName} setSessionName={setSessionName} />
          </div>
          {isSettingsOpen && (
            <div className="col-span-3 min-h-0">
              <Settings setShowAddProvider={setShowAddProvider} setShowPutProvider={setShowPutProvider} setShowRemoveProvider={setShowRemoveProvider} providers={providers} chatConfig={chatConfig} setChatConfig={setChatConfig} />
            </div>
          )}
          {sessionsOpen && (
            <div className="col-span-3 min-h-0">
              <Sessions setMessages={setMessages} setSessionId={setSessionId} setSessionName={setSessionName} />
            </div>
          )}
          {showAddProvider && isSettingsOpen && (
            <div className="col-span-3 min-h-0">
              <AddProvider setShowAddProvider={setShowAddProvider} reloadProviders={loadProviders} />
            </div>
          )}
          {showPutProvider && isSettingsOpen && (
            <div className="col-span-3 min-h-0">
              <PutProvider setShowPutProvider={setShowPutProvider} />
            </div>
          )}
          {showRemoveProvider && isSettingsOpen && (
            <div className="col-span-3 row-span-2 min-h-0">
              <RemoveProvider setShowRemoveProvider={setShowRemoveProvider} reloadProviders={loadProviders} />
            </div>
          )}
        </div>
      </main>
    );
}