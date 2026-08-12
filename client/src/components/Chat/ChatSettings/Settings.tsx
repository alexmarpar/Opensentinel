import ProvidersList from "../../../services/Chat/ProviderGetList";
import  ChatConfig from "../classes/ChatConfig";
function Settings({ setShowAddProvider, setShowPutProvider, setShowRemoveProvider, providers, chatConfig, setChatConfig }: { setShowAddProvider: (show: boolean) => void; setShowPutProvider: (show: boolean) => void; setShowRemoveProvider: (show: boolean) => void; providers: string[]; chatConfig: ChatConfig; setChatConfig: React.Dispatch<React.SetStateAction<ChatConfig>>; }) {
  
  return (
    <div>
      <ProvidersList providers={providers} chatConfig={chatConfig} setChatConfig={setChatConfig} />

      <h1> Choose an option:</h1>
      <div className="border-t border-zinc-700 pt-5 space-y-4">
        <button
          className="w-full cursor-pointer rounded-md bg-blue-600 py-2 hover:bg-blue-700"
          onClick={() => setShowAddProvider(true)}
        >
          Add Provider
        </button>
        <button
          className="w-full cursor-pointer rounded-md bg-blue-600 py-2 hover:bg-blue-700"
          onClick={() => setShowPutProvider(true)}
        >
          Change Provider
        </button>

        <button
          className="w-full cursor-pointer rounded-md bg-blue-600 py-2 hover:bg-blue-700"
           onClick={() => setShowRemoveProvider(true)}
        >
          Remove Provider
        </button>
      </div>
    </div>
  );
}

export default Settings;