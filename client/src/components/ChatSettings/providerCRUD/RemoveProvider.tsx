import { useState } from 'react'

function RemoveProvider({ setShowRemoveProvider, reloadProviders }: { setShowRemoveProvider: (show: boolean) => void; reloadProviders: () => void }) {
    const [provider, setProvider] = useState("");
    
    const handleSave = async () => {
        try {
            const response = await fetch(
        `http://localhost:3000/providers/${encodeURIComponent(provider)}`,
        {
            method: "DELETE",
        }
        );

        if (!response.ok) {
        throw new Error("Error deleting provider");
        }

        console.log("Provider deleted");
        setShowRemoveProvider(false);
        } catch (err) {
            console.error(err);
        }
        reloadProviders();
    };
  return (
    <div className="rounded-lg border pg-5 border-zinc-700 bg-zinc-800 p-5 shadow-xl text-white space-y-6">
      <h2 className="flex items-center mb-4 text-xl font-semibold text-white">
        Change Provider
        <button className="ml-auto h-8 w-14 min-h-0 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700" onClick={() => setShowRemoveProvider(false)}>
        Close
      </button>
      </h2>
      <div className="flex flex-col space-y-4">
        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            Provider
          </label>
          <input
            type="text"
            placeholder="ex: openai, ollama"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-blue-500"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />
        </div>
        <button
          className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition cursor-pointer hover:bg-blue-700"
          onClick={handleSave}
        >
          Remove Provider
        </button>
      </div>
      
    </div>
  );
}

export default RemoveProvider;