import type ChatConfig from "../classes/ChatConfig";
import { sendMessage } from "../../../services/sendMessage";
import { useState, type Dispatch, type SetStateAction } from "react";
import { GetSessionName } from "../../../services/Chat/session/GetSessionName";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function Input({ chatConfig, inputMessage, setInputMessage, setMessages, setSessionName, sessionId, setSessionId }: { chatConfig: ChatConfig, inputMessage: string, setInputMessage: (message: string) => void, setMessages:  Dispatch<SetStateAction<Message[]>>, setSessionName: (name: string) => void, sessionId: string | undefined, setSessionId: (id: string | undefined) => void }) {
  
  return (
    <footer className="border-t border-zinc-700 p-2">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Write a message..."
            className="w-full min-w-0 flex-1 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-white outline-none focus:border-blue-500"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />

          <button className="rounded-lg cursor-pointer bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700" onClick={async () => { setMessages((prevMessages) => [...prevMessages, { role: "user", content: inputMessage }]);   try {const response = await sendMessage(chatConfig.provider, inputMessage, chatConfig.model, sessionId); setMessages((prevMessages) => [...prevMessages, { role: "assistant", content: response.response }]); setInputMessage(""); setSessionId(response.sessionId); setSessionName(await GetSessionName(response.sessionId)) } catch (error) { console.error("Error sending message:", error); } }}>
            Send
          </button>
        </div>
      </footer>
  )
}

export default Input