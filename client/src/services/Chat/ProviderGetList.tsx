type ChatConfig = {
  provider: string;
  model: string;
};

export default function ProvidersList({
  providers,
  chatConfig,
  setChatConfig,
}: {
  providers: string[];
  chatConfig: ChatConfig;
  setChatConfig: React.Dispatch<React.SetStateAction<ChatConfig>>;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-zinc-300">
        Providers configured:
      </h3>

      <div className="space-y-2">
        {providers.map((provider) => {
          const selected = chatConfig.provider === provider;

          return (
            <div
              key={provider}
              className={`rounded-lg border p-3 flex justify-between items-center ${
                selected
                  ? "border-blue-500 bg-zinc-800"
                  : "border-zinc-700 bg-zinc-900"
              }`}
            >
              <div>
                <p className="font-medium text-white">{provider}</p>
                <span className="text-green-400 text-sm">Saved</span>
              </div>

              <button
                onClick={() =>
                  setChatConfig((prev) => ({
                    ...prev,
                    provider,
                  }))
                }
                className={`px-3 py-1 rounded-md text-sm transition ${
                  selected
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-700 hover:bg-zinc-600 text-white"
                }`}
              >
                {selected ? "Selected" : "Select"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}