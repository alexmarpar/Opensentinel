import ProvidersList from "../../services/ProviderGetList";
function Settings({ setShowAddProvider, setShowPutProvider, setShowRemoveProvider, providers }: { setShowAddProvider: (show: boolean) => void; setShowPutProvider: (show: boolean) => void; setShowRemoveProvider: (show: boolean) => void; providers: string[]; setProviders: (providers: string[]) => void; }) {

  return (
    <div>
      <ProvidersList providers={providers} />

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