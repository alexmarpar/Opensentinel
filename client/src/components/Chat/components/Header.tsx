import settings from '../../../assets/dashboard/chat/settings.svg'
import sessions from '../../../assets/dashboard/chat/sessions.svg'
function Header({settingsOpen, setSettingsOpen, sessionName, sessionsOpen, setSessionsOpen}: {settingsOpen: boolean, setSettingsOpen: (open: boolean) => void, sessionName: string, sessionsOpen: boolean, setSessionsOpen: (open: boolean) => void}) {
  return (
    <header className="border-b border-zinc-700 p-2">
        <h2 className="flex text-lg font-semibold text-white"> AI Centinel 
        <span className="flex-1 text-center text-white text-lg font-medium"> Session: {sessionName} </span>
        <div className="flex items-center gap-2 ml-4">
        <img src={sessions}
        alt="Sessions"
        onClick={() => setSessionsOpen(!sessionsOpen)}
        className={`ml-auto  bg-white cursor-pointer rounded-full transition-transform duration-300 ${
        sessionsOpen ? "scale-90" : "scale-100"
        }`}/>
        <img src={settings}
        alt="Settings"
        onClick={() => setSettingsOpen(!settingsOpen)}
        className={`ml-auto  bg-white cursor-pointer rounded-full transition-transform duration-300 ${
        settingsOpen ? "rotate-180" : "rotate-0"
        }`}/>
        </div>
        </h2>
        <p className="text-sm text-zinc-400">
         You have to save your SSH keys/logins first, then you can ask Centinela to manage them for you.
        </p>
      </header>
  )
}

export default Header