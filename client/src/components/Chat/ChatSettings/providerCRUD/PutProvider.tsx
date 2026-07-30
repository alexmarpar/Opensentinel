import React, { useState } from 'react'

function PutProvider({ setShowPutProvider }: { setShowPutProvider: (show: boolean) => void }) {
    const [provider, setProvider] = useState("");
    const [newapikey, setApikey] = useState("");
    const [model, setModel] = useState("");
    
    const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/providers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider,
          newapikey,
          model,
        }),
      });

      if (!response.ok) {
        throw new Error("Error saving provider");
      }

      console.log("Provider saved");
      setShowPutProvider(false);
    } catch (err) {
      console.error(err);
    }
      }
  return (
    <div className="rounded-lg border pg-5 border-zinc-700 bg-zinc-800 p-5 shadow-xl text-white space-y-6">
      <h2 className="flex items-center mb-4 text-xl font-semibold text-white">
        Change Provider
        <button className="ml-auto h-8 w-14 min-h-0 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700" onClick={() => setShowPutProvider(false)}>
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

        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            NEW API Key
          </label>
          <input
            type="password"
            placeholder="********"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-blue-500"
            value={newapikey}
            onChange={(e) => setApikey(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            NEW Model
          </label>
          <input
            type="text"
            placeholder="ex: qwen2.5-coder:7b"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-blue-500"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </div>

        <button
          className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition cursor-pointerhover:bg-blue-700"
          onClick={handleSave}
        >
          Change Provider
        </button>
      </div>
      
    </div>
  );
}

export default PutProvider;