import type ChatConfig from "../classes/ChatConfig";
import { sendMessage } from "../../../services/sendMessage";
import { type Dispatch, type SetStateAction } from "react";
import { GetSessionName } from "../../../services/Chat/session/GetSessionName";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function Input({
  chatConfig,
  inputMessage,
  setInputMessage,
  setMessages,
  setSessionName,
  sessionId,
  setSessionId,
}: {
  chatConfig: ChatConfig;
  inputMessage: string;
  setInputMessage: (message: string) => void;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  setSessionName: (name: string) => void;
  sessionId: string | undefined;
  setSessionId: (id: string | undefined) => void;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: inputMessage },
    ]);

    try {
      setInputMessage("");
      const response = await sendMessage(
        chatConfig.provider,
        inputMessage,
        chatConfig.model,
        sessionId
      );
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: response.response },
      ]);
      setSessionId(response.sessionId);
      setSessionName(await GetSessionName(response.sessionId));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <footer className="border-t border-zinc-700 p-2">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="Write a message..."
          autoComplete="off"
          className="w-full min-w-0 flex-1 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-blue-500"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />

        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </footer>
  );
}

export default Input;