import { useState } from "react";

function AddProvider({
  setShowAddProvider,
  reloadProviders,
}: {
  setShowAddProvider: (show: boolean) => void;
  reloadProviders: () => void;
}) {
  const [provider, setProvider] = useState("");
  const [apikey, setApikey] = useState("");
  const [model, setModel] = useState("");

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/providers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider,
          apikey,
          model,
        }),
      });

      if (!response.ok) {
        throw new Error("Error saving provider");
      }

      reloadProviders();
      console.log("Provider saved");
      setShowAddProvider(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-5 shadow-xl text-white">
      <h2 className="mb-4 flex items-center text-xl font-semibold">
        Add Provider
        <button
          type="button"
          className="ml-auto h-8 w-14 rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowAddProvider(false)}
        >
          Close
        </button>
      </h2>

      <form onSubmit={handleSave} className="flex flex-col space-y-4">
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
            API Key
          </label>
          <input
            type="password"
            autoComplete="off"
            placeholder="********"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-blue-500"
            value={apikey}
            onChange={(e) => setApikey(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-zinc-300">
            Model
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
          type="submit"
          className="w-full rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700 cursor-pointer"
        >
          Save Provider
        </button>
      </form>
    </div>
  );
}

export default AddProvider;