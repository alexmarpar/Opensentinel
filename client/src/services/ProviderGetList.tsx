export default function ProvidersList({ providers }: { providers: string[] }) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-zinc-300">
        Providers configured:
      </h3>

      <div className="space-y-2">
        {providers.map((provider) => (
          <div
            key={provider}
            className="rounded-lg bg-zinc-900 border border-zinc-700 p-3 flex justify-between items-center"
          >
            <p className="font-medium text-white">{provider}</p>

            <span className="text-green-400 text-sm">Saved</span>
          </div>
        ))}
      </div>
    </div>
  );
}