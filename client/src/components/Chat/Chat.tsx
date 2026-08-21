import Header from './components/Header'
import Messages from './components/Messages';
import Input from './components/Input';
import type ChatConfig from './classes/ChatConfig';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { type Message } from './classes/Messages';

function Chat({isSettingsOpen, setIsSettingsOpen, chatConfig, sessionsOpen, setSessionsOpen, messages, setMessages, sessionId, setSessionId, sessionName, setSessionName }: {isSettingsOpen: boolean, setIsSettingsOpen: (open: boolean) => void, chatConfig: ChatConfig, sessionsOpen: boolean, setSessionsOpen: (open: boolean) => void, messages: Message[], setMessages: Dispatch<SetStateAction<Message[]>>, sessionId: string | undefined, setSessionId: (id: string | undefined) => void, sessionName: string, setSessionName: (name: string) => void}) {
  
  const [inputMessage, setInputMessage] = useState("");
  return (
    <section className="flex h-full min-h-0 flex-col rounded-xl border border-zinc-700 bg-zinc-900 shadow-lg">
        <Header settingsOpen={isSettingsOpen} setSettingsOpen={setIsSettingsOpen} sessionName={sessionName} sessionsOpen={sessionsOpen} setSessionsOpen={setSessionsOpen} />
         
        <Messages inputMessage={inputMessage} messages={messages} />
        <Input chatConfig={chatConfig} inputMessage={inputMessage} setInputMessage={setInputMessage} setMessages={setMessages} setSessionName={setSessionName} sessionId={sessionId} setSessionId={setSessionId} />
    </section>
  )};
   

export default Chat