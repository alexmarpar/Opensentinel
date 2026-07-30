type ChatConfig = {
  provider: string;
  model: string;
};

type Model = {
  provider: string;
  model: string;
};

function ModelSelector({
  models,
  chatConfig,
  setChatConfig,
}: {
  models: Model[];
  chatConfig: ChatConfig;
  setChatConfig: React.Dispatch<React.SetStateAction<ChatConfig>>;
}) {
  return (
    <div className="flex flex-col gap-2">
      {models.map((m) => (
        <button
          key={`${m.provider}-${m.model}`}
          onClick={() =>
            setChatConfig({
              provider: m.provider,
              model: m.model,
            })
          }
          className={`rounded-lg border p-2 text-left transition ${
            chatConfig.provider === m.provider &&
            chatConfig.model === m.model
              ? "bg-blue-600 border-blue-500"
              : "bg-zinc-800 border-zinc-700 hover:bg-zinc-700"
          }`}
        >
          <div className="font-medium">{m.model}</div>
          <div className="text-sm text-zinc-400">{m.provider}</div>
        </button>
      ))}
    </div>
  );
}