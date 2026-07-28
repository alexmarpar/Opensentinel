import settings from '../../../assets/dashboard/chat/settings.svg'

function Header({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) {
  return (
    <header className="border-b border-zinc-700 p-2">
        <h2 className="flex text-lg font-semibold text-white"> AI Centinel <img src={settings}
        alt="Settings"
        onClick={() => setOpen(!open)}
        className={`ml-auto  bg-white cursor-pointer rounded-full transition-transform duration-300 ${
        open ? "rotate-180" : "rotate-0"
        }`}/>
        </h2>
        <p className="text-sm text-zinc-400">
         You have to save your SSH keys/logins first, then you can ask Centinela to manage them for you.
        </p>
      </header>
  )
}

export default Header