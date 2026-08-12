import { useEffect, useState, type Dispatch, type SetStateAction, } from "react";
import GetSessions from "../../../services/Chat/session/GetSessions";
import { type Message } from "../classes/Messages";
import GetMessagesSession from "../../../services/Chat/session/GetMessagesSession";
import { GetSessionName } from "../../../services/Chat/session/GetSessionName";
import deleteSession from "../../../services/Chat/session/DeleteSession";

function Sessions({  setMessages, setSessionId, setSessionName }: { setMessages: Dispatch<SetStateAction<Message[]>>; setSessionId: (id: string | undefined) => void; setSessionName: (name: string) => void }) {
  const [sessions, setSessions] = useState<{ title: string, sessionId: string }[]>([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const sessionsData = await GetSessions();
        setSessions(sessionsData);
      } catch (err) {
        console.error(err);
      }
    };

    loadSessions();
  }, []);
  return (
    <div>
      <h1 className="mb-2 text-lg font-semibold text-white">Sessions</h1>

      {sessions.length === 0 ? (
        <p className="text-zinc-400">No sessions found.</p>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2">
          {sessions.map((session) => (
  <div key={session.sessionId} className="mb-2 flex gap-2">
    <button
      onClick={async () => {
        try {
          setSessionName(await GetSessionName(session.sessionId));
          setSessionId(session.sessionId);

          const sessionMessages = await GetMessagesSession({
            id: session.sessionId,
          });

          setMessages(sessionMessages);
        } catch (err) {
          console.error(err);
        }
      }}
      className="flex-1 rounded bg-zinc-800 p-2 text-left cursor-pointer hover:bg-zinc-700"
    >
      {session.title}
    </button>

    <button
      className="rounded bg-red-500 px-3 hover:bg-red-600 cursor-pointer"
      onClick={async () => {
        try {
          await deleteSession(session.sessionId);

          setSessions((prev) =>
            prev.filter((s) => s.sessionId !== session.sessionId)
          );
        } catch (err) {
          console.error(err);
        }
      }}
    >
      Remove
    </button>
  </div>
))}
        </div>
      )}
    </div>
  );
}
export default Sessions;