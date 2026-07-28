import { useEffect, useState } from 'react';
import Chat from '../components/Chat/Chat';
import Settings from '../components/ChatSettings/Settings';
import AddProvider from '../components/ChatSettings/providerCRUD/AddProvider';
import PutProvider from '../components/ChatSettings/providerCRUD/PutProvider';
import RemoveProvider from '../components/ChatSettings/providerCRUD/RemoveProvider';

export default function Dashboard() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showAddProvider, setShowAddProvider] = useState(false);
  const [showPutProvider, setShowPutProvider] = useState(false);
  const [showRemoveProvider, setShowRemoveProvider] = useState(false);
  const [providers, setProviders] = useState<string[]>([]);

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
            <Chat isSettingsOpen={isSettingsOpen} setIsSettingsOpen={setIsSettingsOpen} />
          </div>
          {isSettingsOpen && (
            <div className="col-span-3 min-h-0">
              <Settings setShowAddProvider={setShowAddProvider} setShowPutProvider={setShowPutProvider} setShowRemoveProvider={setShowRemoveProvider} providers={providers} />
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
            <div className="col-span-3 min-h-0">
              <RemoveProvider setShowRemoveProvider={setShowRemoveProvider} reloadProviders={loadProviders} />
            </div>
          )}
        </div>
      </main>
    );
}