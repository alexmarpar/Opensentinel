import { useEffect, useState } from "react";
import SSHGetlist from "../../services/Chat/ssh/SSHGetlist";
import key from "../../assets/sshpanel/key.svg";
import password from "../../assets/sshpanel/password.svg";
import Topbar from "./Topbar";
import AddDevice from "./AddDevice";
import RemoveDevice from "../../services/SSH/RemoveDevice";
import PutDevice from "../../services/SSH/PutDevice";

type Session = {
  name: string;
  host: string;
  port: number;
  username: string;
  filekeys?: boolean;
};

function SSHPanel() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [openedAddDevice, setOpenedAddDevice] = useState(false);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  useEffect(() => {
    const loadSessions = async () => {
      try {
        const data = await SSHGetlist();
        setSessions(data)
      } catch (err) {
        console.error(err);
      }
    };

    loadSessions();
  }, []);
  const filteredDevices = sessions.filter((session) =>
  session.name.toLowerCase().includes(search.toLowerCase()) ||
  session.host.toLowerCase().includes(search.toLowerCase()) ||
  session.username.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div>
      <Topbar setOpenedAddDevice={setOpenedAddDevice} setSearch={setSearch} />
      {openedAddDevice && <AddDevice setOpenedAddDevice={setOpenedAddDevice} />}
      <div className=" space-y-2">
        {filteredDevices.map((session) => (
          <div
            key={session.name}
            className="rounded bg-zinc-800 p-3 font-mono text-xl hover:bg-zinc-700"
          >
            {editing === session.name ? (
              <form onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await PutDevice(
                    session.name,
                    newName
                  );
                  setEditing(null);
                  setSessions((prev) =>
                    prev.map((s) =>
                      s.name === session.name ? { ...s, name: newName } : s
                    )
                  );
                } catch (err) {
                  console.error(err);
                }
              }}>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-zinc-700 text-white placeholder:text-zinc-500 border border-zinc-600 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="bg-green-500 cursor-pointer hover:bg-green-600 text-white ml-auto rounded-fill px-3 py-1 text-sm font-semibold"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">
            {session.name}
            <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white ml-auto rounded-fill px-3 py-1 text-sm font-semibold"
                    onClick={() => {
                      setEditing(session.name);
                      setNewName(session.name);
                    }}
            >
              Edit
            </button>
            
            </h2>
            <button className="bg-red-500 cursor-pointer hover:bg-red-600 text-white ml-auto rounded-fill px-3 py-1 text-sm font-semibold"
                      onClick={async () => {
                        try {
                          await RemoveDevice(session.name);

                          setSessions((prev) =>
                            prev.filter((s) => s.name !== session.name)
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
              >
                Remove
              </button>
            </div>
            )}
            <h2 className="text-lg font-bold">IP: {session.host}</h2> <h1 className="text-lg font-bold">Port: {session.port}</h1> <h1 className="text-lg font-bold">Username: {session.username}</h1>
            <h2 className="flex items-center gap-2 text-lg font-bold">
              Login method: {session.filekeys ? "Key-based" : "Password-based"}
               <img
                src={session.filekeys ? key : password}
                alt=""
                className="h-5 w-5"
              /> 
              
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SSHPanel;