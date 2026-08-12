import { useState } from "react";
import PostDevice from "../../services/SSH/PostDevice";

function AddDevice({ setOpenedAddDevice }: { setOpenedAddDevice: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState(22);
  const [username, setUsername] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      await PostDevice({
        name,
        host,
        port,
        username,
      });

      setOpenedAddDevice(false);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-800 p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Add Device</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="name">
                Device Name
            </label>
            <input
              type="text"
                id="name"
                className="w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-700 text-white focus:outline-none focus:border-blue-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="ip">
                    IP Address
                </label>
                <input
                    type="text"
                    id="ip"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-700 text-white focus:outline-none focus:border-blue-500"
                    value={host}
                    onChange={(e) => setHost(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="port">
                    Port
                </label>
                <input
                    type="number"
                    id="port"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-700 text-white focus:outline-none focus:border-blue-500"
                    value={port}
                    onChange={(e) => setPort(parseInt(e.target.value) || 22)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-white mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    type="text"
                    id="username"
                    className="w-full px-3 py-2 rounded-lg border border-zinc-600 bg-zinc-700 text-white focus:outline-none focus:border-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mt-6 flex justify-end gap-3">
            <button
                type="button"
                onClick={() => setOpenedAddDevice(false)}
                className="rounded-lg border border-zinc-600 px-4 py-2 font-medium text-zinc-300 transition cursor-pointer hover:bg-zinc-700"
            >
                Cancel
            </button>

            <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition cursor-pointer hover:bg-blue-700"
            >
                Add Device
            </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default AddDevice
