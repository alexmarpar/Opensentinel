import { useEffect, useState, type Dispatch, type SetStateAction, } from "react";
import GetSessions from "../../../services/Chat/session/GetSessions";
import { type Message } from "../classes/Messages";
import GetMessagesSession from "../../../services/Chat/session/GetMessagesSession";
import { GetSessionName } from "../../../services/Chat/session/GetSessionName";

function Sessions({  setMessages, setSessionId, setSessionName }: { setMessages: Dispatch<SetStateAction<Message[]>>; setSessionId: (id: string | undefined) => void; setSessionName: (name: string) => void }) {
  const [sessions, setSessions] = useState<{ title: string, sessionId: string }[]>([]);

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const sessionsData = await GetSessions();
        console.log("Sessions data:", sessionsData);
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
        <button
        key={session.sessionId}
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
      className="w-full rounded bg-zinc-800 p-2 text-left cursor-pointer hover:bg-zinc-700"
    >
      {session.title}
    </button>
  ))}
</div>
      )}
    </div>
  );
}

export default Sessions;