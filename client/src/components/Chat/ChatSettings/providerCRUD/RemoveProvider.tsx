import { useState } from "react";

function RemoveProvider({
  setShowRemoveProvider,
  reloadProviders,
}: {
  setShowRemoveProvider: (show: boolean) => void;
  reloadProviders: () => void;
}) {
  const [provider, setProvider] = useState("");

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      reloadProviders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800 p-5 shadow-xl text-white">
      <h2 className="mb-4 flex items-center text-xl font-semibold">
        Remove Provider
        <button
          type="button"
          className="ml-auto h-8 w-14 cursor-pointer rounded-md bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowRemoveProvider(false)}
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
            autoComplete="username"
            placeholder="ex: openai, ollama"
            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-blue-500"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded-md bg-blue-600 py-2 font-medium text-white transition hover:bg-blue-700"
        >
          Remove Provider
        </button>
      </form>
    </div>
  );
}

export default RemoveProvider;